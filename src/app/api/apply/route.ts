import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/core/database/prisma";
import { encryptField } from "@/core/encryption/crypto";

const sanitizeCompanyName = (name: string) => {
  return name.replace(/\b(llc|inc|llp|corp)\b/gi, (match) => match.toUpperCase());
};

// Strict Zod schema for commercial funding applications
const applySchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please enter a valid corporate email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  legalName: z.string().min(2, "Business name must be at least 2 characters."),
  ein: z.string().regex(/^\d{2}-?\d{7}$|^\d{9}$/, "EIN must be a valid 9-digit Business Tax ID."),
  revenueAnnual: z.number().positive("Annual revenue must be a positive number."),
  requestedAmount: z.number().positive("Requested funding must be a positive number."),
  timeInBusiness: z.string().optional().nullable(),
  useOfFunds: z.string().optional().nullable(),
  creditScoreTier: z.string().optional().nullable(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    // Validate inputs
    const validatedData = applySchema.parse(body);

    // Encrypt the sensitive EIN/Tax ID field server-side using AES-256-GCM
    const encryptedPayload = encryptField(validatedData.ein);
    const einEncryptedString = `${encryptedPayload.iv}:${encryptedPayload.encryptedData}:${encryptedPayload.tag}`;

    // Capture and Encrypt Session Metadata
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1";
    const metadataJson = JSON.stringify({
      userAgent,
      ip,
      timestamp: new Date().toISOString(),
    });
    const encryptedMetadataPayload = encryptField(metadataJson);
    const encryptedMetadataString = `${encryptedMetadataPayload.iv}:${encryptedMetadataPayload.encryptedData}:${encryptedMetadataPayload.tag}`;

    // Initialize and Encrypt Status Tracking Audit Logs
    const initialLogsJson = JSON.stringify([
      {
        timestamp: new Date().toISOString(),
        status: "SUBMITTED",
        event: "Application submitted and encrypted via secure client-side wizard.",
        actor: "SYSTEM",
      },
    ]);
    const encryptedLogsPayload = encryptField(initialLogsJson);
    const encryptedLogsString = `${encryptedLogsPayload.iv}:${encryptedLogsPayload.encryptedData}:${encryptedLogsPayload.tag}`;

    const sanitizedLegalName = sanitizeCompanyName(validatedData.legalName);

    // Perform atomic database persistence inside a Prisma transaction
    const transactionResult = await prisma.$transaction(async (rawTx) => {
      const tx = rawTx as typeof prisma;
      // 1. Locate or create User record
      let user = await tx.user.findUnique({
        where: { email: validatedData.email },
      });

      if (!user) {
        user = await tx.user.create({
          data: {
            email: validatedData.email,
            passwordHash: "oauth-placeholder-pass-2026",
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            role: "CLIENT",
          },
        });
      } else {
        user = await tx.user.update({
          where: { email: validatedData.email },
          data: {
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
          },
        });
      }

      // 2. Locate or create Company profile
      let company = await tx.company.findUnique({
        where: { userId: user.id },
      });

      if (!company) {
        company = await tx.company.create({
          data: {
            userId: user.id,
            legalName: sanitizedLegalName,
            einEncrypted: einEncryptedString,
            revenueAnnual: validatedData.revenueAnnual,
            phone: validatedData.phone,
          },
        });
      } else {
        company = await tx.company.update({
          where: { userId: user.id },
          data: {
            legalName: sanitizedLegalName,
            einEncrypted: einEncryptedString,
            revenueAnnual: validatedData.revenueAnnual,
            phone: validatedData.phone,
          },
        });
      }

      // 3. Create the FundingApplication with encrypted metadata and logs
      const application = await tx.fundingApplication.create({
        data: {
          companyId: company.id,
          requestedAmount: validatedData.requestedAmount,
          status: "SUBMITTED",
          notes: "Web application wizard submission with session tracking.",
          encryptedMetadata: encryptedMetadataString,
          encryptedLogs: encryptedLogsString,
          timeInBusiness: validatedData.timeInBusiness || null,
          useOfFunds: validatedData.useOfFunds || null,
          creditScoreTier: validatedData.creditScoreTier || null,
        },
      });

      return { user, company, application };
    });

    return NextResponse.json({
      success: true,
      message: "Application processed and secured successfully.",
      applicationId: transactionResult.application.id,
    }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: "Validation failed.",
        errors: error.flatten().fieldErrors,
      }, { status: 400 });
    }

    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({
      success: false,
      message: "Server failed to process application.",
      error: errorMessage,
    }, { status: 500 });
  }
}
