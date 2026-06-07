import { prisma } from "@/core/database/prisma";
import AdminTable, { MappedApplication } from "./AdminTable";
import React from "react";
import Link from "next/link";
import { encryptField } from "@/core/encryption/crypto";
import LogoutButton from "./LogoutButton";

export const revalidate = 0;

export default async function AdminPage(): Promise<React.JSX.Element> {
  // 1. Fetch initial lists
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

  const mappedApplications: readonly MappedApplication[] = applications.map((app) => {
    const tokenPayload = encryptField(app.id);
    const token = `${tokenPayload.iv}:${tokenPayload.encryptedData}:${tokenPayload.tag}`;
    
    return {
      id: app.id,
      token,
      createdAt: app.createdAt.toISOString(),
      requestedAmount: Number(app.requestedAmount),
      status: app.status,
      timeInBusiness: app.timeInBusiness,
      useOfFunds: app.useOfFunds,
      creditScoreTier: app.creditScoreTier,
      company: {
        id: app.company.id,
        legalName: app.company.legalName,
        revenueAnnual: Number(app.company.revenueAnnual),
        phone: app.company.phone,
        user: {
          firstName: app.company.user.firstName,
          lastName: app.company.user.lastName,
          email: app.company.user.email,
        },
      },
    };
  });

  // 2. Fetch advanced reporting metrics (Prisma Aggregations)
  const totalCompanies = await prisma.company.count();
  const totalDocuments = await prisma.financialDocument.count();
  
  const aggregates = await prisma.fundingApplication.aggregate({
    _sum: {
      requestedAmount: true,
    },
  });
  
  const totalFundingVolume = Number(aggregates._sum.requestedAmount ?? 0);
  const formattedVolume = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalFundingVolume);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#020b24] text-white">
      {/* Header Shell */}
      <header className="border-b border-slate-800/80 bg-brand-dark/40 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-lg text-white tracking-widest flex flex-col leading-none">
            <span className="text-sm tracking-wider">BIGGS</span>
            <span className="text-xs text-[#0ba5f9] tracking-widest font-extrabold mt-0.5">UNDERWRITING DESK</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Secured Node Active</span>
            </div>
            <Link
              href="/"
              className="text-xs bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 px-3.5 py-1.5 rounded-xl font-medium transition-smooth"
            >
              Back to Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white mb-2">
              Underwriter Review Matrix
            </h1>
            <p className="text-slate-400 text-xs">
              Secure administrative access to client applications. Decryption of sensitive corporate information is executed on-demand.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="/api/admin/export"
              download
              className="text-xs bg-[#e08b00] hover:bg-[#d67d00] border border-[#d67d00]/30 text-white font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-smooth shadow-lg shadow-[#e08b00]/15 flex items-center gap-2"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Excel Report
            </a>
          </div>
        </div>

        {/* SECURE AUTOMATED REPORTING METRICS PANEL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-950/45 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#0ba5f9]/5 rounded-full blur-2xl" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Total Filings</div>
            <div className="text-2xl font-black text-white">{mappedApplications.length}</div>
            <p className="text-[9px] text-slate-500 mt-1">Submitted applications</p>
          </div>

          <div className="bg-slate-950/45 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e08b00]/5 rounded-full blur-2xl" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Funding Volume</div>
            <div className="text-2xl font-black text-[#e08b00]">{formattedVolume}</div>
            <p className="text-[9px] text-slate-500 mt-1">Total requested pipeline</p>
          </div>

          <div className="bg-slate-950/45 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Secured Files</div>
            <div className="text-2xl font-black text-emerald-450">{totalDocuments}</div>
            <p className="text-[9px] text-slate-500 mt-1">Uploaded bank/tax files</p>
          </div>

          <div className="bg-slate-950/45 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Corporate Clients</div>
            <div className="text-2xl font-black text-purple-400">{totalCompanies}</div>
            <p className="text-[9px] text-slate-500 mt-1">Registered businesses</p>
          </div>
        </div>

        <AdminTable initialApplications={mappedApplications} />
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800/80 bg-brand-dark/20 text-center text-[10px] text-slate-500">
        © 2026 Biggs Funding Solutions. Secure Admin Console.
      </footer>
    </div>
  );
}
