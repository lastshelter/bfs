"use client";

import React from "react";
import Link from "next/link";

export default function BadCreditBusinessLoansPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,139,0,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-amber-500/10 text-amber-500 tracking-wide uppercase mb-2 border border-amber-500/20">
            Alternative Credit Options
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
            Bad Credit <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Business Loans</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-350 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            Specialized lender programs offering 10-year term loans with monthly payments for credit-challenged business owners.
          </p>
          <div className="pt-2 px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Check Qualification
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Details & Parameters */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Narrative copy & stat grid) */}
          <div className="md:col-span-7 space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                A Second Chance for Credit-Challenged Businesses
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                We believe that all merchants should have the chance to get the funding they need when they need it, so they can live their dreams and meet their business&apos;s needs and goals. 
              </p>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                We offer a unique lender program providing 10-year term loans with predictable monthly payments for merchants who are credit challenged. Whether your credit score is under 600, you have discharged bankruptcies in your past, or you have open tax liens with active payment plans, we can help find a path forward.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-[#0ba5f9] uppercase tracking-wider block mb-1">Amortization</span>
                <span className="text-2xl font-extrabold text-white">10 Years</span>
                <p className="text-xs text-slate-400 mt-1">Predictable long-term repayment schedules.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block mb-1">Payments</span>
                <span className="text-2xl font-extrabold text-white">Monthly</span>
                <p className="text-xs text-slate-400 mt-1">Convenient monthly debits, not daily splits.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1">Fast Decision</span>
                <span className="text-2xl font-extrabold text-white">Within 5h</span>
                <p className="text-xs text-slate-400 mt-1">Rapid underwriting from direct submission.</p>
              </div>
            </div>

            {/* State Availability Notice */}
            <div className="p-6 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Territorial Availability</h4>
              <p className="text-xs md:text-sm text-slate-450 leading-relaxed">
                * This specific 10-year credit-challenged loan program is applicable in 30 select states across the U.S. Please contact our support team or apply to see if your business is registered in a qualifying jurisdiction.
              </p>
            </div>
          </div>

          {/* Right Column (Parameters & Requirements Card) */}
          <div className="md:col-span-5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-bold text-amber-500 tracking-wider uppercase mb-6 pb-3 border-b border-slate-800">
              Funding Requirements
            </h3>
            
            <ul className="space-y-4">
              {[
                "Online application completed",
                "Complete last 4 months of the business bank statements",
                "Copy of business owner's driver's license",
                "Copy of a voided check from the account of business bank",
                "Bank login verification completed",
                "Monthly payment debited from merchant's account"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-sm md:text-base">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-400 mb-4">
                Unsure if you qualify? Apply to speak to our underwriting desk.
              </p>
              <Link href="/apply">
                <span className="inline-block text-sm font-semibold text-[#0ba5f9] hover:text-[#0ba5f9]/80 hover:underline transition cursor-pointer">
                  Start Application Now
                </span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
