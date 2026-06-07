"use client";

import React from "react";
import Link from "next/link";

export default function assetbackedloansPage(): React.JSX.Element {
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
            Asset Backed Loans
          </h1>
          <p className="text-slate-350 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Whether you have excellent credit or bad credit and your company need funds to maintain or to grow the business, or you can not get approved for a short term or long term loan or you simply do not want to go down that road, or you don&apos;t have months t...
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
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Needed 1. Online application completed 2. Pictures of Equipment to be pledged 3. Proof of ownership of equipment ( Title or Bill of sale, invoices, or receipt ) 4. Complete last 6 months of the business bank statements 5. Copy of Business voided check 6. Colored copy of driver&apos;s license
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
                <span>Asset Backed Loans</span>
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
