"use client";

import React from "react";
import Link from "next/link";

export default function termloansPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#06153b]/40 px-6 py-16 md:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e08b00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase text-[#0ba5f9] font-bold tracking-widest bg-[#0ba5f9]/10 px-3 py-1 rounded-full">
            Commercial Finance
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Term Loans
          </h1>
          <p className="text-slate-350 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            The following Term Loans are available through Biggs Funding Solutions marketplace banks for working capital, debt refinance, and new equipment purchase:
          </p>
          <div className="pt-4">
            <Link
              href="/apply"
              className="inline-block bg-[#e08b00] hover:bg-[#d67d00] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-smooth shadow-lg shadow-[#e08b00]/15"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl w-full mx-auto px-6 py-16 space-y-12">
        {/* Paragraphs */}
        <div className="space-y-6">
          <div className="flex items-start gap-2 text-xs text-slate-300 pl-4">
            <span className="text-[#0ba5f9]">•</span>
            <p className="leading-relaxed">$ 30,000 to $ 200,000 loan amounts • 2 to 5-year repayment terms • Fixed interest from 6.99% APR to 26.99% APR</p>
          </div>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Interest rate depends on loan term and the applicant’s credit and financial profile.
          </p>
        
          <div className="flex items-start gap-2 text-xs text-slate-300 pl-4">
            <span className="text-[#0ba5f9]">•</span>
            <p className="leading-relaxed">Time in business must be above 2 years • Business owner’s personal credit score must be above 650 • The business must be U.S. based and owned by U.S. citizen or Lawful Permanent Resident who is at least 21 years old • No outstanding tax liens • No bankruptcies or foreclosures in the past 3 years • No recent charge-offs or settlements • Current on government-related loans</p>
          </div>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Required documents • Online application completed • Complete Last 6 months of the business bank statements • Business and personal tax returns last 2 years • P&L and Balance Sheet for the year apply for loan • Complete debt schedule
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            About Us Contact Us
          </p>
        </div>

        {/* Headings */}
        

        {/* Lists & Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-950/40 relative">
          <h3 className="font-display font-semibold text-sm uppercase text-[#0ba5f9] tracking-wider mb-4">
            Parameters & Requirements
          </h3>
          <ul className="space-y-3">
            
              <li className="text-xs text-slate-300 flex items-start gap-2.5">
                <span className="text-[#0ba5f9] mt-0.5">•</span>
                <span>Term Loans</span>
              </li>
            
          </ul>
        </div>
      </div>

        {/* Verification and Security Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-950/20 text-center space-y-4">
          <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
            Secured Connection & Fast Processing
          </h4>
          <p className="text-[11px] text-slate-400 max-w-lg mx-auto">
            All applications are processed securely using AES-256-GCM encryption. Pre-qualification outcomes are delivered within 24 to 48 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/apply"
              className="inline-block bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl text-[#0ba5f9] transition-smooth"
            >
              Get Pre-qualified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
