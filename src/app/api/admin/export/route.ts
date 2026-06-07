import "server-only";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { prisma } from "@/core/database/prisma";
import { decryptField } from "@/core/encryption/crypto";

const sanitizeCompanyName = (name: string) => {
  return name.replace(/\b(llc|inc|llp|corp)\b/gi, (match) => match.toUpperCase());
};

export const revalidate = 0;

export async function GET(): Promise<NextResponse> {
  try {
    // 1. Fetch funding applications
    const applications = await prisma.fundingApplication.findMany({
      include: {
        company: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 2. Initialize Excel Workbook and Worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Funding Applications");

    // Define column headers
    worksheet.columns = [
      { header: "Date Filed", key: "createdAt", width: 22 },
      { header: "Client Name", key: "clientName", width: 25 },
      { header: "Email Address", key: "email", width: 30 },
      { header: "Company Name", key: "companyName", width: 32 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Decrypted Tax ID (EIN)", key: "einDecrypted", width: 25 },
      { header: "Requested Funding", key: "requestedAmount", width: 22 },
      { header: "Application Status", key: "status", width: 20 },
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "008EE3" }, // financial blue header
      };
    });

    // Add data rows with decrypted EIN values
    applications.forEach((app) => {
      let decryptedEin = "Masked";
      const parts = app.company.einEncrypted.split(":");
      
      if (parts.length === 3) {
        const iv = parts[0];
        const encryptedData = parts[1];
        const tag = parts[2];
        if (iv && encryptedData && tag) {
          try {
            decryptedEin = decryptField(iv, encryptedData, tag);
          } catch {
            decryptedEin = "Decryption Error";
          }
        }
      }

      worksheet.addRow({
        createdAt: app.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        clientName: `${app.company.user.firstName} ${app.company.user.lastName}`,
        email: app.company.user.email,
        companyName: sanitizeCompanyName(app.company.legalName),
        phone: app.company.phone,
        einDecrypted: decryptedEin,
        requestedAmount: Number(app.requestedAmount),
        status: app.status,
      });
    });

    // Format currency column
    const requestedAmountColumn = worksheet.getColumn("requestedAmount");
    requestedAmountColumn.numFmt = '"$"#,##0';

    // 3. Write Excel spreadsheet to binary buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Return the download stream
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=Funding_Applications_Export.xlsx",
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, message: "Excel reporting engine failed.", error: errorMessage },
      { status: 500 }
    );
  }
}
