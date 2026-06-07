import React from 'react';
import Link from 'next/link';

export default function SBALoans() {
  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* 🌌 MOBILE-OPTIMIZED HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-purple-500/10 text-purple-400 tracking-wide uppercase mb-5 border border-purple-500/20">
            Government Backed Programs
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 px-2">
            Gold-Standard <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">SBA Financing</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed px-4">
            Capitalize your business using elite federal lending structures. Enjoy rock-bottom interest rates and extended repayment timelines backed by the Small Business Administration.
          </p>
          <div className="px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base md:text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Check Pre-Qualification
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 📊 CONTENT MATRIX & PARAMETERS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left Column */}
          <div className="space-y-6 px-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              The Ultimate Financial Foundation for US Enterprises
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              SBA 7(a) and Express frameworks represent the most protective debt structures in commercial finance. Because Uncle Sam mitigates institutional lender risk, we can pass along exceptionally low prime-indexed rates and extended lengths up to 10-25 years.
            </p>
            <div className="p-5 bg-slate-900/30 border border-slate-800/50 rounded-xl space-y-3">
              <h3 className="text-base md:text-lg font-semibold text-white">Fast-Track Express Packaging</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Traditional SBA structures can stall out for months. Our streamlined processing desk optimizes compliance preparation to systematically cut down administrative turnaround delays.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />
            <h3 className="text-xs font-bold text-purple-400 tracking-wider uppercase mb-5 pb-2 border-b border-slate-800/60">
              SBA Matrix Requirements
            </h3>
            <ul className="space-y-4">
              {[
                "Established operational timeline: 2+ Years preferred",
                "Strong historical business and personal financial profile",
                "Target personal credit score benchmark: 680+",
                "No open federal liens, tax delinquencies, or student loan defaults",
                "Operates cleanly as a legal for-profit corporate entity",
                "Must file inside recognized domestic US geographic markets",
                "Required documentation: 3 years tax returns + detailed business sheets"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-sm md:text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
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
