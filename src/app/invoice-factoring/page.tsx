"use client";

import React from "react";
import Link from "next/link";

export default function InvoiceFactoringPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,139,0,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase mb-2 border border-[#0ba5f9]/20">
            Accounts Receivable Finance
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
            Invoice <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Factoring Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            Convert your outstanding B2B invoices into immediate operational cash flow. Avoid waiting 30, 60, or 90 days for client payments and unlock your working capital today.
          </p>
          <div className="pt-2 px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Content & Parameters Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column (Details) */}
          <div className="space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Unlock Cash Flow Tied in Accounts Receivable
              </h2>
              <p className="text-sm md:text-base text-slate-350 leading-relaxed">
                Waiting on customer payments is one of the primary hurdles to scaling B2B businesses. Invoice factoring bypasses traditional bank debt by selling your outstanding invoices to a factoring company. Biggs Funding Solutions matches your ledger with top factoring desks to secure maximum advance rates.
              </p>
            </div>

            {/* Feature grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-bold text-[#0ba5f9] uppercase tracking-wider block mb-1">Advance Rates</span>
                <span className="text-xl font-extrabold text-white">85% to 95%</span>
                <p className="text-xs text-slate-400 mt-1">Get the majority of invoice value wired within 24 hours.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-bold text-[#e08b00] uppercase tracking-wider block mb-1">Fee Rates</span>
                <span className="text-xl font-extrabold text-white">As Low as 0.25%</span>
                <p className="text-xs text-slate-400 mt-1">Weekly factoring fee rates based on invoice credit profile.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-bold text-emerald-450 uppercase tracking-wider block mb-1">Factoring Limit</span>
                <span className="text-xl font-extrabold text-white">Up to $5 Million</span>
                <p className="text-xs text-slate-400 mt-1">Scalable credit limits that expand directly with invoice volume.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Decision Window</span>
                <span className="text-xl font-extrabold text-white">Within 24 Hours</span>
                <p className="text-xs text-slate-400 mt-1">Pre-qualification and term sheet delivery timeline.</p>
              </div>
            </div>

            <p className="text-xs text-slate-450 italic leading-relaxed">
              * The factoring fee structure depends heavily on the creditworthiness of your B2B clients, invoice volumes, and history of ledger collections.
            </p>
          </div>

          {/* Right Column (Parameters & Requirements Card) */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-bold text-[#0ba5f9] tracking-wider uppercase mb-6 pb-3 border-b border-slate-800">
              Parameters & Requirements
            </h3>
            
            <ul className="space-y-4">
              {[
                "Complete online pre-qualification application",
                "Submit outstanding invoices for credit screening",
                "Works with creditworthy B2B or government debtors",
                "Factoring lines scale from $20K up to $5M monthly",
                "No minimum personal credit score requirement",
                "Initial funding advance processed within 24 hours of setup",
                "Required documentation: Current Accounts Receivable Aging Report"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-sm md:text-base">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Trust & Security Verification Row */}
      <section className="max-w-6xl w-full mx-auto px-4 pb-20">
        <div className="glass-panel p-8 rounded-2xl border border-slate-800/80 bg-slate-950/20 text-center space-y-4 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
          <h4 className="font-display font-semibold text-sm text-white uppercase tracking-wider">
            Secured Connection & Bank-Grade Compliance
          </h4>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            All sensitive business files and information uploads are processed securely using active client-side AES-256-GCM encryption layers to prevent leak risks.
          </p>
          <div className="pt-2">
            <Link href="/apply">
              <span className="inline-block bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl text-[#0ba5f9] transition-smooth cursor-pointer">
                Get Pre-qualified
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
