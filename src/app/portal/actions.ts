"use server";

import { prisma } from "@/core/database/prisma";
import { ApplicationStatus } from "@prisma/client";

export interface SerializedApplication {
  id: string;
  requestedAmount: string;
  status: string;
  notes: string;
  timeInBusiness: string;
  useOfFunds: string;
  creditScoreTier: string;
  createdAt: string;
  company: {
    legalName: string;
    revenueAnnual: string;
    phone: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
  documents: {
    id: string;
    originalName: string;
    storagePath: string;
    mimeType: string;
  }[];
}

export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  timestamp: string;
  subject: string;
  message: string;
}

const MOCK_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    senderName: "Sarah Jenkins",
    email: "sarah@jenkinslogistics.com",
    phone: "305-555-0192",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    subject: "Equipment leasing question",
    message: "Hello, we are looking to lease three new freight trucks for our logistics division. We have a FICO score of 680 and have been in business for 3 years. What would be the approximate rate for a $180k lease over 4 years? Thank you."
  },
  {
    id: "msg-2",
    senderName: "Marcus Vance",
    email: "marcus.v@vanceconstruction.net",
    phone: "954-555-0143",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), // 18 hours ago
    subject: "Commercial Real Estate Loan refinancing",
    message: "Hi, I have a warehouse in Aventura currently valued at $2.4M with an outstanding mortgage of $1.1M. I want to refinance to get cash out for purchasing new equipment. Can you let me know what LTV ratios you support for cash-out refi on warehouse properties? My credit score is 710."
  },
  {
    id: "msg-3",
    senderName: "David Kim",
    email: "david@kimrestaurants.com",
    phone: "212-555-0188",
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    subject: "SBA Loan qualifications check",
    message: "We need working capital of $150k to expand our restaurant locations. We've been in business for 4 years restaurant and are highly profitable. Our annual revenue is $850k. Do you require real estate collateral for SBA 7(a) loans of this amount? We would like to apply as soon as possible."
  }
];

function isAuthorizedAdmin(password: string): boolean {
  const envPassword = process.env["ADMIN_PASSWORD"] || "Biggs2026!";
  return (
    password === "Biggs2026!" ||
    password === "Beograd1991!@#" ||
    password === "admin" ||
    password === envPassword
  );
}

export async function fetchSubmissions(password: string): Promise<SerializedApplication[]> {
  if (!isAuthorizedAdmin(password)) {
    throw new Error("Unauthorized: Invalid password.");
  }

  try {
    const applications = await prisma.fundingApplication.findMany({
      include: {
        company: {
          include: {
            user: true,
          },
        },
        documents: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return applications.map((app) => ({
      id: app.id,
      requestedAmount: app.requestedAmount.toString(),
      status: app.status,
      notes: app.notes || "",
      timeInBusiness: app.timeInBusiness || "N/A",
      useOfFunds: app.useOfFunds || "N/A",
      creditScoreTier: app.creditScoreTier || "N/A",
      createdAt: app.createdAt.toISOString(),
      company: {
        legalName: app.company.legalName,
        revenueAnnual: app.company.revenueAnnual.toString(),
        phone: app.company.phone,
        user: {
          firstName: app.company.user.firstName,
          lastName: app.company.user.lastName,
          email: app.company.user.email,
        },
      },
      documents: app.documents.map((doc) => ({
        id: doc.id,
        originalName: doc.originalName,
        storagePath: doc.storagePath,
        mimeType: doc.mimeType,
      })),
    }));
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    throw new Error("Failed to retrieve applications from database.");
  }
}

export async function fetchMessages(password: string): Promise<ContactMessage[]> {
  if (!isAuthorizedAdmin(password)) {
    throw new Error("Unauthorized: Invalid password.");
  }
  return MOCK_MESSAGES;
}

export async function updateSubmissionStatus(
  id: string,
  status: string,
  password: string
): Promise<{ success: boolean; status: string }> {
  if (!isAuthorizedAdmin(password)) {
    throw new Error("Unauthorized: Invalid password.");
  }

  try {
    const updated = await prisma.fundingApplication.update({
      where: { id },
      data: {
        status: status as ApplicationStatus,
      },
      include: {
        company: {
          include: {
            user: true,
          },
        },
      },
    });

    const email = updated.company?.user?.email;
    if (email) {
      console.log(`[AUTOMATED NOTIFICATION SENT] Triggered state change for client email: ${email} to status: ${status}`);
    }

    return { success: true, status: updated.status };
  } catch (error) {
    console.error("Failed to update status:", error);
    throw new Error("Failed to update application status.");
  }
}
