"use client";

import React from "react";
import Link from "next/link";

export default function AdditionalFundingPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-amber-500/10 text-amber-500 tracking-wide uppercase mb-2 border border-amber-500/20">
            Multi-Position Capital
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
            Additional <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Business Funding</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            Leverage your cash flow to secure supplementary working capital, even with existing open merchant cash advance positions.
          </p>
          <div className="pt-2 px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Get Pre-qualified
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column (Details) */}
          <div className="space-y-6 px-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Flexible Capital Behind Open Positions
            </h2>
            <p className="text-sm md:text-base text-slate-350 leading-relaxed">
              If you currently have a business loan of some sort or merchant cash advance, we can help to provide you with more working capital—not a problem. We can sometimes get you funded up to 9 positions behind your first position.
            </p>
            <p className="text-sm md:text-base text-slate-350 leading-relaxed">
              Approval and overall funding depend heavily on whether your business cash flow can safely afford the additional payments without going into default. Our underwriting desk works to structure repayments to protect your operations.
            </p>
          </div>

          {/* Right Column (Parameters & Requirements Card) */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e08b00]/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-bold text-amber-500 tracking-wider uppercase mb-6 pb-3 border-b border-slate-800">
              Lending Guidelines
            </h3>
            
            <ul className="space-y-4">
              {[
                "We can fund up to 9 positions behind your primary loan",
                "Assessments are executed on cash flow affordability metrics",
                "Repayments are scaled specifically to prevent default risks",
                "Required documentation: Current debt schedule of open positions",
                "Required documentation: 4 months of business bank statements",
                "Fast-track pre-qualification checks within 24 to 48 hours"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-sm md:text-base">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-amber-550 shadow-[0_0_8px_rgba(224,139,0,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
