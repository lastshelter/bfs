import { NextResponse } from 'next/server';

// 1. Define explicit types for company data inside the application object
interface CompanyData {
  einEncrypted?: string | null;
  legalName?: string | null;
}

interface ExportApplication {
  id: string;
  clientName?: string | null;
  status?: string | null;
  company?: CompanyData | null;
}

export async function GET() {
  try {
    // Mock application data array for structure validation
    const applications: ExportApplication[] = [];

    let csvContent = "File ID,Client Name,Status,EIN\n";

    // 2. Added explicit type arguments here (app: ExportApplication) to clear the error instantly
    applications.forEach((app: ExportApplication) => {
      let decryptedEin = "Masked";

      if (app.company?.einEncrypted) {
        const parts = app.company.einEncrypted.split(":");
        if (parts.length === 2) {
          decryptedEin = "Encrypted_Data";
        }
      }

      const row = `"${app.id}","${app.clientName || 'N/A'}","${app.status || 'Pending'}","${decryptedEin}"\n`;
      csvContent += row;
    });

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=applications-export.csv',
      },
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Export Failure' }, { status: 500 });
  }
}
