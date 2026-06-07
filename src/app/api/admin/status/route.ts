import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/core/database/prisma";
import { encryptField, decryptField } from "@/core/encryption/crypto";
import { ApplicationStatus } from "@prisma/client";

interface StatusUpdateRequest {
  readonly applicationId: string;
  readonly status: ApplicationStatus;
}

interface AuditLog {
  readonly timestamp: string;
  readonly status: string;
  readonly event: string;
  readonly actor: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as StatusUpdateRequest;
    const { applicationId, status } = body;

    if (!applicationId || typeof applicationId !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing application identifier." },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Missing new application status." },
        { status: 400 }
      );
    }

    // Verify application exists
    const application = await prisma.fundingApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found." },
        { status: 404 }
      );
    }

    // Update status and append tracking log
    let decryptedLogs: AuditLog[] = [];
    if (application.encryptedLogs) {
      const logsParts = application.encryptedLogs.split(":");
      if (logsParts.length === 3) {
        const logsIv = logsParts[0];
        const logsEnc = logsParts[1];
        const logsTag = logsParts[2];
        if (logsIv && logsEnc && logsTag) {
          const logsDecrypted = decryptField(logsIv, logsEnc, logsTag);
          decryptedLogs = JSON.parse(logsDecrypted) as AuditLog[];
        }
      }
    }

    decryptedLogs.push({
      timestamp: new Date().toISOString(),
      status,
      event: `Status updated from ${application.status} to ${status}`,
      actor: "UNDERWRITER",
    });

    const encryptedLogsPayload = encryptField(JSON.stringify(decryptedLogs));
    const encryptedLogsString = `${encryptedLogsPayload.iv}:${encryptedLogsPayload.encryptedData}:${encryptedLogsPayload.tag}`;

    const updatedApp = await prisma.fundingApplication.update({
      where: { id: applicationId },
      data: {
        status,
        encryptedLogs: encryptedLogsString,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully.",
        status: updatedApp.status,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Failed to update status.", error: errorMessage },
      { status: 500 }
    );
  }
}
