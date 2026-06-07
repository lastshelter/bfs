import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/core/database/prisma";
import { encryptField } from "@/core/encryption/crypto";

interface AuditLog {
  readonly timestamp: string;
  readonly status: string;
  readonly event: string;
  readonly actor: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const applicationId = formData.get("applicationId");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Missing binary file payload." },
        { status: 400 }
      );
    }

    if (!applicationId || typeof applicationId !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing target application identifier." },
        { status: 400 }
      );
    }

    // Verify application exists
    const application = await prisma.fundingApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Funding application not found." },
        { status: 404 }
      );
    }

    // Encrypt the original filename before storage
    const originalName = file.name;
    const mimeType = file.type;
    const encryptedPayload = encryptField(originalName);
    const encryptedNameString = `${encryptedPayload.iv}:${encryptedPayload.encryptedData}:${encryptedPayload.tag}`;

    // Randomized, obscure UUID-based storage mapping
    const fileUuid = crypto.randomUUID();
    const uploadsDir = path.join(process.cwd(), "storage", "documents");
    
    // Ensure uploads directory exists
    await fs.mkdir(uploadsDir, { recursive: true });

    // Target binary storage path
    const storagePath = path.join(uploadsDir, `${fileUuid}.bin`);
    
    // Write array buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(storagePath, buffer);

    // Save relational model in Prisma
    const document = await prisma.financialDocument.create({
      data: {
        applicationId,
        originalName: encryptedNameString,
        storagePath: `${fileUuid}.bin`,
        mimeType,
      },
    });

    // Update status tracking logs to note document addition
    let decryptedLogs: AuditLog[] = [];
    if (application.encryptedLogs) {
      const logsParts = application.encryptedLogs.split(":");
      if (logsParts.length === 3) {
        const logsIv = logsParts[0];
        const logsEnc = logsParts[1];
        const logsTag = logsParts[2];
        if (logsIv && logsEnc && logsTag) {
          const { decryptField } = await import("@/core/encryption/crypto");
          const logsDecrypted = decryptField(logsIv, logsEnc, logsTag);
          decryptedLogs = JSON.parse(logsDecrypted) as AuditLog[];
        }
      }
    }

    decryptedLogs.push({
      timestamp: new Date().toISOString(),
      status: application.status,
      event: `Document upload completed: ${originalName} (${mimeType})`,
      actor: "SYSTEM",
    });

    const encryptedLogsPayload = encryptField(JSON.stringify(decryptedLogs));
    const encryptedLogsString = `${encryptedLogsPayload.iv}:${encryptedLogsPayload.encryptedData}:${encryptedLogsPayload.tag}`;

    await prisma.fundingApplication.update({
      where: { id: applicationId },
      data: {
        encryptedLogs: encryptedLogsString,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Document uploaded and secured successfully.",
        documentId: document.id,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Upload pipeline failed.", error: errorMessage },
      { status: 500 }
    );
  }
}
