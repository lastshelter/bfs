import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/core/database/prisma";
import { decryptField } from "@/core/encryption/crypto";

interface DecryptRequest {
  readonly applicationId: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as DecryptRequest;
    const { applicationId } = body;

    if (!applicationId || typeof applicationId !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing application identifier." },
        { status: 400 }
      );
    }

    const application = await prisma.fundingApplication.findUnique({
      where: { id: applicationId },
      include: {
        company: true,
        documents: true,
      },
    });

    if (!application || !application.company) {
      return NextResponse.json(
        { success: false, message: "Application or associated company not found." },
        { status: 404 }
      );
    }

    const { einEncrypted, revenueAnnual } = application.company;

    // Decrypt EIN
    const parts = einEncrypted.split(":");
    if (parts.length !== 3) {
      return NextResponse.json(
        { success: false, message: "Invalid encrypted EIN payload format." },
        { status: 500 }
      );
    }
    const iv = parts[0];
    const encryptedData = parts[1];
    const tag = parts[2];
    if (!iv || !encryptedData || !tag) {
      return NextResponse.json(
        { success: false, message: "Invalid encrypted EIN payload format." },
        { status: 500 }
      );
    }
    const decryptedEin = decryptField(iv, encryptedData, tag);

    // Decrypt Metadata
    let decryptedMetadata = null;
    if (application.encryptedMetadata) {
      const metaParts = application.encryptedMetadata.split(":");
      if (metaParts.length === 3) {
        const metaIv = metaParts[0];
        const metaEnc = metaParts[1];
        const metaTag = metaParts[2];
        if (metaIv && metaEnc && metaTag) {
          const metaDecrypted = decryptField(metaIv, metaEnc, metaTag);
          decryptedMetadata = JSON.parse(metaDecrypted);
        }
      }
    }

    // Decrypt Logs
    let decryptedLogs = null;
    if (application.encryptedLogs) {
      const logsParts = application.encryptedLogs.split(":");
      if (logsParts.length === 3) {
        const logsIv = logsParts[0];
        const logsEnc = logsParts[1];
        const logsTag = logsParts[2];
        if (logsIv && logsEnc && logsTag) {
          const logsDecrypted = decryptField(logsIv, logsEnc, logsTag);
          decryptedLogs = JSON.parse(logsDecrypted);
        }
      }
    }

    // Decrypt Document Names
    const decryptedDocs = [];
    if (application.documents) {
      for (const doc of application.documents) {
        const docParts = doc.originalName.split(":");
        if (docParts.length === 3) {
          const docIv = docParts[0];
          const docEnc = docParts[1];
          const docTag = docParts[2];
          if (docIv && docEnc && docTag) {
            const docDecrypted = decryptField(docIv, docEnc, docTag);
            decryptedDocs.push({
              id: doc.id,
              originalName: docDecrypted,
              mimeType: doc.mimeType,
              uploadedAt: doc.uploadedAt.toISOString(),
            });
          }
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        ein: decryptedEin,
        revenueAnnual: Number(revenueAnnual),
        metadata: decryptedMetadata,
        logs: decryptedLogs,
        documents: decryptedDocs,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Failed to decrypt record.", error: errorMessage },
      { status: 500 }
    );
  }
}
