import Link from "next/link";
import React from "react";
import { prisma } from "@/core/database/prisma";
import StatusPoller from "./StatusPoller";

export const revalidate = 0;

interface TrackStep {
  readonly id: number;
  readonly label: string;
  readonly date: string;
  readonly status: "completed" | "current" | "upcoming";
}

export default async function PortalDashboardPage(): Promise<React.JSX.Element> {
  // Retrieve the latest application in the system to display
  const latestApp = await prisma.fundingApplication.findFirst({
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

  if (!latestApp) {
    return (
      <div className="flex-1 flex flex-col min-h-screen bg-[#020b24] text-white">
        <header className="border-b border-slate-800/80 bg-brand-dark/30 backdrop-blur-md px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-display font-bold text-lg text-white tracking-widest">
              BIGGS FUNDING
            </Link>
          </div>
        </header>
        <main className="flex-1 max-w-xl w-full mx-auto px-6 py-20 text-center flex flex-col justify-center items-center">
          <div className="glass-panel p-10 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="font-display text-xl font-bold">No Active Application Found</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Start your secure multi-step business funding wizard to begin pre-qualification and upload your documents.
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-3 bg-[#0ba5f9] hover:bg-[#008ee3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-smooth"
            >
              Start Application Wizard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const appStatus = latestApp.status;

  // Determine tracker step states based on DB status
  const steps: readonly TrackStep[] = [
    {
      id: 1,
      label: "Application Received",
      date: new Date(latestApp.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
      status: "completed",
    },
    {
      id: 2,
      label: "Document Verification",
      date: appStatus === "DRAFT" || appStatus === "SUBMITTED" ? "In Progress" : "Verified",
      status: appStatus === "DRAFT" || appStatus === "SUBMITTED" ? "current" : "completed",
    },
    {
      id: 3,
      label: "Underwriting Analysis",
      date: appStatus === "IN_REVIEW" ? "Analyzing Details" : appStatus === "APPROVED" || appStatus === "FUNDED" ? "Analysis Done" : "Awaiting Info",
      status: appStatus === "IN_REVIEW" ? "current" : appStatus === "APPROVED" || appStatus === "FUNDED" ? "completed" : "upcoming",
    },
    {
      id: 4,
      label: "Offer Issuance",
      date: appStatus === "APPROVED" ? "Offer Prepared" : appStatus === "FUNDED" ? "Offer Accepted" : "Pending Analysis",
      status: appStatus === "APPROVED" ? "current" : appStatus === "FUNDED" ? "completed" : "upcoming",
    },
    {
      id: 5,
      label: "Funding Disbursal",
      date: appStatus === "FUNDED" ? "Capital Released" : "Pending Sign-off",
      status: appStatus === "FUNDED" ? "completed" : "upcoming",
    },
  ];

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(latestApp.requestedAmount));

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#020b24] text-white">
      <StatusPoller />

      {/* Header Shell */}
      <header className="border-b border-slate-800/80 bg-brand-dark/30 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-lg text-white tracking-widest">
            BIGGS FUNDING
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">
              Welcome, <span className="text-white font-semibold">{latestApp.company.legalName}</span>
            </span>
            <Link
              href="/"
              className="text-[10px] bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-smooth"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white mb-1">
              Active Funding Tracker
            </h1>
            <p className="text-slate-400 text-xs">
              Real-time progression analytics of your commercial capital application. Updates automatically.
            </p>
          </div>
          <div className="bg-slate-950/45 border border-slate-800/80 rounded-xl p-4 flex gap-8">
            <div>
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Requested Funding
              </div>
              <div className="text-xl font-extrabold text-[#e08b00]">{formattedAmount}</div>
            </div>
            <div className="border-l border-slate-800/60 pl-8">
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Application Status
              </div>
              <div className="text-xl font-extrabold text-white">{latestApp.status}</div>
            </div>
          </div>
        </div>

        {/* Tracker Progression Component */}
        <div className="glass-panel rounded-2xl p-8 border border-slate-800 shadow-xl mb-8">
          <h2 className="font-display text-lg font-semibold text-white mb-6">
            Underwriting & Review Progress
          </h2>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800 md:left-0 md:right-0 md:top-4 md:bottom-auto md:w-auto md:h-0.5" />

            <div className="relative flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
              {steps.map((step) => {
                const isCompleted = step.status === "completed";
                const isCurrent = step.status === "current";

                return (
                  <div key={step.id} className="relative flex items-start md:flex-col md:items-center text-left md:text-center md:flex-1">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 z-10 transition-smooth ${
                        isCompleted
                          ? "bg-[#e08b00] border-[#e08b00] text-slate-950"
                          : isCurrent
                          ? "bg-slate-900 border-[#0ba5f9] text-[#0ba5f9] animate-pulse"
                          : "bg-[#020b24] border-slate-800 text-slate-600"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-4 md:ml-0 md:mt-4">
                      <h3 className={`text-sm font-semibold ${isCurrent ? "text-[#0ba5f9]" : "text-white"}`}>
                        {step.label}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
