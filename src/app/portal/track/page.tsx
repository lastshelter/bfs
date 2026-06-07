import "server-only";
import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/core/database/prisma";
import { decryptField } from "@/core/encryption/crypto";
import PortalUpload from "./PortalUpload";
import RadarReportCard from "./RadarReportCard";

interface PageProps {
  readonly searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface AuditLog {
  readonly timestamp: string;
  readonly status: string;
  readonly event: string;
  readonly actor: string;
}

export const revalidate = 0;

export default async function TrackPage({ searchParams }: PageProps): Promise<React.JSX.Element> {
  const params = await searchParams;
  const token = typeof params["token"] === "string" ? params["token"] : undefined;

  if (!token) {
    notFound();
  }

  const parts = token.split(":");
  if (parts.length !== 3) {
    notFound();
  }

  const iv = parts[0];
  const encryptedData = parts[1];
  const tag = parts[2];

  if (!iv || !encryptedData || !tag) {
    notFound();
  }

  let applicationId: string;
  try {
    applicationId = decryptField(iv, encryptedData, tag);
  } catch {
    notFound();
  }

  const application = await prisma.fundingApplication.findUnique({
    where: { id: applicationId },
    include: {
      company: {
        include: {
          user: true,
        },
      },
      documents: true,
    },
  });

  if (!application || !application.company || !application.company.user) {
    notFound();
  }

  // Decrypt uploaded documents
  const decryptedDocuments = application.documents.map((doc) => {
    let name = "Secured File";
    const docParts = doc.originalName.split(":");
    if (docParts.length === 3) {
      const docIv = docParts[0];
      const docEnc = docParts[1];
      const docTag = docParts[2];
      if (docIv && docEnc && docTag) {
        try {
          name = decryptField(docIv, docEnc, docTag);
        } catch {
          name = "Decryption Error";
        }
      }
    }
    return {
      id: doc.id,
      name,
      mimeType: doc.mimeType,
      uploadedAt: doc.uploadedAt,
    };
  });

  // Decrypt audit logs
  let decryptedLogs: readonly AuditLog[] = [];
  if (application.encryptedLogs) {
    const logsParts = application.encryptedLogs.split(":");
    if (logsParts.length === 3) {
      const logsIv = logsParts[0];
      const logsEnc = logsParts[1];
      const logsTag = logsParts[2];
      if (logsIv && logsEnc && logsTag) {
        try {
          const logsDecrypted = decryptField(logsIv, logsEnc, logsTag);
          decryptedLogs = JSON.parse(logsDecrypted) as readonly AuditLog[];
        } catch {
          // Keep empty if decryption fails
        }
      }
    }
  }

  const currentStatus = application.status;

  // Timeline statuses: SUBMITTED, UNDERWRITING, APPROVED, FUNDED
  const isDenied = currentStatus === "DENIED";
  const isDraft = currentStatus === "DRAFT";

  let currentStepIndex = -1;
  if (currentStatus === "SUBMITTED") currentStepIndex = 0;
  else if (currentStatus === "IN_REVIEW") currentStepIndex = 1;
  else if (currentStatus === "APPROVED") currentStepIndex = 2;
  else if (currentStatus === "FUNDED") currentStepIndex = 3;

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(application.requestedAmount));

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#020b24] text-white">
      {/* Portal Header */}
      <header id="client-portal-header" className="border-b border-slate-800/80 bg-brand-dark/40 backdrop-blur-md px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-display font-bold text-lg text-white tracking-widest flex flex-col leading-none">
            <span className="text-sm tracking-wider">BIGGS</span>
            <span className="text-xs text-[#0ba5f9] tracking-widest font-extrabold mt-0.5">SECURE PORTAL</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="h-2 w-2 rounded-full bg-[#0ba5f9] animate-pulse" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Encrypted Portal Session</span>
          </div>
        </div>
      </header>

      {/* Main Track Dashboard */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white mb-2">
              Application Tracker
            </h1>
            <p className="text-slate-400 text-xs">
              Monitor progress, view underwriting advisory communications, and upload files.
            </p>
          </div>
          <div className="bg-slate-950/50 border border-slate-850 px-4 py-2 rounded-xl text-right">
            <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 block">Requested Capital</span>
            <span className="text-lg font-black text-[#0ba5f9]">{formattedAmount}</span>
          </div>
        </div>

        {/* Timeline Tracking Block */}
        <div id="status-timeline-panel" className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-350 mb-6">
            Real-Time Processing Status
          </h2>

          {isDenied ? (
            <div className="border border-rose-500/30 bg-rose-500/5 rounded-xl p-5 mb-4 text-center">
              <h3 className="text-rose-450 font-bold text-sm mb-1">Application Declined</h3>
              <p className="text-slate-450 text-xs">
                Underwriting review concluded that your profile does not meet our active commercial funding thresholds at this time.
              </p>
            </div>
          ) : isDraft ? (
            <div className="border border-[#e08b00]/30 bg-[#e08b00]/5 rounded-xl p-5 mb-4 text-center">
              <h3 className="text-[#e08b00] font-bold text-sm mb-1">Draft Application</h3>
              <p className="text-slate-450 text-xs">
                Your application has not been submitted yet. Please complete your filing to initiate underwriting review.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {/* Connector line for large screens */}
              <div className="hidden md:block absolute top-[22px] left-[12.5%] right-[12.5%] h-0.5 bg-slate-800 pointer-events-none z-0" />
              
              {/* Step 1: SUBMITTED */}
              <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center z-10">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-smooth ${
                  currentStepIndex >= 0
                    ? "bg-[#0ba5f9]/10 border-[#0ba5f9] text-[#0ba5f9] shadow-lg shadow-[#0ba5f9]/10"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  {currentStepIndex > 0 ? "✓" : "1"}
                </div>
                <div className="text-left md:text-center">
                  <div className={`text-xs font-bold ${currentStepIndex >= 0 ? "text-white" : "text-slate-500"}`}>Submitted</div>
                  <div className="text-[10px] text-slate-500">Wizard completed</div>
                </div>
              </div>

              {/* Step 2: UNDERWRITING (mapped from IN_REVIEW) */}
              <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center z-10">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-smooth ${
                  currentStepIndex >= 1
                    ? "bg-[#0ba5f9]/10 border-[#0ba5f9] text-[#0ba5f9] shadow-lg shadow-[#0ba5f9]/10"
                    : currentStepIndex === 0
                    ? "bg-slate-900 border-[#0ba5f9]/40 text-[#0ba5f9]/70 animate-pulse"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  {currentStepIndex > 1 ? "✓" : "2"}
                </div>
                <div className="text-left md:text-center">
                  <div className={`text-xs font-bold ${currentStepIndex >= 1 ? "text-white" : "text-slate-500"}`}>Underwriting</div>
                  <div className="text-[10px] text-slate-500">Assessing financials</div>
                </div>
              </div>

              {/* Step 3: APPROVED */}
              <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center z-10">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-smooth ${
                  currentStepIndex >= 2
                    ? "bg-[#0ba5f9]/10 border-[#0ba5f9] text-[#0ba5f9] shadow-lg shadow-[#0ba5f9]/10"
                    : currentStepIndex === 1
                    ? "bg-slate-900 border-[#0ba5f9]/40 text-[#0ba5f9]/70 animate-pulse"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  {currentStepIndex > 2 ? "✓" : "3"}
                </div>
                <div className="text-left md:text-center">
                  <div className={`text-xs font-bold ${currentStepIndex >= 2 ? "text-white" : "text-slate-500"}`}>Approved</div>
                  <div className="text-[10px] text-slate-500">Term sheet active</div>
                </div>
              </div>

              {/* Step 4: FUNDED */}
              <div className="flex flex-row md:flex-col items-center gap-4 md:gap-2 text-center z-10">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-smooth ${
                  currentStepIndex >= 3
                    ? "bg-[#e08b00]/10 border-[#e08b00] text-[#e08b00] shadow-lg shadow-[#e08b00]/10"
                    : currentStepIndex === 2
                    ? "bg-slate-900 border-[#0ba5f9]/40 text-[#0ba5f9]/70 animate-pulse"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}>
                  4
                </div>
                <div className="text-left md:text-center">
                  <div className={`text-xs font-bold ${currentStepIndex >= 3 ? "text-[#e08b00]" : "text-slate-500"}`}>Funded</div>
                  <div className="text-[10px] text-slate-500">Capital wired</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Split Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Client profile details, communication logs, and audit logs */}
          <div className="md:col-span-2 space-y-8">
            {/* Interactive Radar Report Card */}
            <RadarReportCard
              creditScoreTier={application.creditScoreTier}
              revenueAnnual={Number(application.company.revenueAnnual)}
              timeInBusiness={application.timeInBusiness}
              requestedAmount={Number(application.requestedAmount)}
            />

            {/* Business Profile Metadata */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative">
              <h3 className="font-display font-semibold text-lg text-white mb-4">
                Corporate Profile
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Company Name</span>
                  <p className="text-sm font-semibold text-slate-200">{application.company.legalName}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Primary Contact</span>
                  <p className="text-sm font-semibold text-slate-200">
                    {application.company.user.firstName} {application.company.user.lastName}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Corporate Email</span>
                  <p className="text-sm font-semibold text-slate-200">{application.company.user.email}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold">Contact Phone</span>
                  <p className="text-sm font-semibold text-slate-200">{application.company.phone}</p>
                </div>
              </div>
            </div>

            {/* Underwriter Advisory Block */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative">
              <h3 className="font-display font-semibold text-lg text-white mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#e08b00]" />
                Underwriter Advisory Notes
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 font-mono">
                {application.notes ? application.notes : "No advisory communications or term sheet details have been appended to this portal session yet. Please monitor this panel for missing document requests."}
              </p>
            </div>

            {/* Document Audits */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative">
              <h3 className="font-display font-semibold text-lg text-white mb-4">
                Secured Document Catalog
              </h3>
              {decryptedDocuments.length === 0 ? (
                <p className="text-slate-500 text-xs">No documents uploaded for this application session yet.</p>
              ) : (
                <div className="space-y-3">
                  {decryptedDocuments.map((doc) => (
                    <div key={doc.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50 border border-slate-850">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-[#0ba5f9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-slate-250 truncate max-w-[200px] md:max-w-md">{doc.name}</p>
                          <span className="text-[9px] text-slate-500 uppercase font-semibold">{doc.mimeType}</span>
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-450">
                        {doc.uploadedAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Audit Logs */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative">
              <h3 className="font-display font-semibold text-lg text-white mb-4">
                Administrative Audit Log
              </h3>
              {decryptedLogs.length === 0 ? (
                <p className="text-slate-500 text-xs">No audit tracking events recorded.</p>
              ) : (
                <div className="space-y-3 border-l-2 border-slate-800 pl-4 ml-2">
                  {decryptedLogs.map((log, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-slate-800 border-2 border-brand-dark" />
                      <div className="text-[9px] text-slate-500 font-bold uppercase">
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <p className="text-xs text-slate-250 font-medium mt-0.5">{log.event}</p>
                      <span className="text-[9px] font-bold text-slate-450 uppercase mt-0.5 inline-block">
                        Actor: {log.actor}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Column 3: Upload files widget */}
          <div>
            <PortalUpload applicationId={application.id} />
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800/80 bg-brand-dark/20 text-center text-[10px] text-slate-500 mt-12">
        © 2026 Biggs Funding Solutions. Encrypted Client Security Console.
      </footer>
    </div>
  );
}
