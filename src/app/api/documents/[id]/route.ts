import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { prisma } from "@/core/database/prisma";
import { decryptField } from "@/core/encryption/crypto";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse | Response> {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing document identifier." },
        { status: 400 }
      );
    }

    // Query database to locate target document metadata
    const document = await prisma.financialDocument.findUnique({
      where: { id },
    });

    if (!document) {
      return NextResponse.json(
        { success: false, message: "Document record not found in system database." },
        { status: 404 }
      );
    }

    // Resolve binary storage path on local filesystem
    const uploadsDir = path.join(process.cwd(), "storage", "documents");
    const filePath = path.join(uploadsDir, document.storagePath);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json(
        { success: false, message: "Stored file asset not found on disk storage." },
        { status: 404 }
      );
    }

    // Read binary file data into memory buffer
    const fileBuffer = await fs.readFile(filePath);

    // Decrypt the original uploaded filename
    let filename = "document";
    try {
      const nameParts = document.originalName.split(":");
      if (nameParts.length === 3 && nameParts[0] && nameParts[1] && nameParts[2]) {
        filename = decryptField(nameParts[0], nameParts[1], nameParts[2]);
      }
    } catch (e) {
      console.error("Failed to decrypt filename, using fallback name:", e);
    }

    const mimeLower = document.mimeType.toLowerCase();

    // Define standard MIME types compatible with native browser viewer
    const viewableMimes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "text/plain",
      "text/html"
    ];

    const isViewable = viewableMimes.includes(mimeLower);

    const headers = new Headers();
    headers.set("Content-Type", document.mimeType);

    if (isViewable) {
      // Force native in-browser rendering
      headers.set("Content-Disposition", "inline");
    } else {
      // Fallback to attachment download for spreadsheet file assets (.xlsx, .xls, .zip, etc.)
      headers.set(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(filename)}"`
      );
    }

    return new Response(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Failed to serve secure document file.", error: errorMessage },
      { status: 500 }
    );
  }
}
