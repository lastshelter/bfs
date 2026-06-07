import React from 'react';
import Link from 'next/link';

export default function BusinessLineOfCredit() {
  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* 🌌 HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-24 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-[#0ba5f9] tracking-wide uppercase mb-6 border border-blue-500/20">
            Commercial Finance
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Flexible Business <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-blue-400">Line of Credit</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Access revolving corporate capital on-demand. Secure same-day approvals and funding with minimal requirements to manage operational cash flows smoothly.
          </p>
          <Link href="/apply">
            <span className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              Apply Now
            </span>
          </Link>
        </div>
      </section>

      {/* 📊 CONTENT MATRIX & PARAMETERS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left Column: Description info */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Strategic Funding Tailored to Your Growth
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Unlike traditional institutional bank loans, a commercial line of credit gives your enterprise financial flexibility. Draw down exactly what you need, when you need it, and only pay interest on the active deployed capital.
            </p>
            <div className="p-6 bg-slate-900/30 border border-slate-800/50 rounded-xl space-y-4">
              <h3 className="text-lg font-semibold text-white">Why Outpace Traditional Debt?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our dynamic credit facility automatically replenishes your borrowing base capacity as your previous outstanding balances are settled, keeping working capital at your immediate disposal.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Glassmorphic Requirements Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
            <h3 className="text-xs font-bold text-[#0ba5f9] tracking-wider uppercase mb-4 pb-2 border-b border-slate-800/60">
              Parameters & Minimum Requirements
            </h3>
            <ul className="space-y-4">
              {[
                "Minimum time in business: 6 months",
                "No active bankruptcies within the past 5 years",
                "Target personal credit score benchmark: 620+",
                "No unresolved tax liens or outstanding open judgments",
                "Maximum limit capacity adjustments up to 2 outstanding files",
                "Streamlined online intake matrix processing application",
                "Verifiable submission: Last 4 months of business bank statements"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-base md:text-lg">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
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
