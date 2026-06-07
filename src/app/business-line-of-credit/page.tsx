import React from 'react';
import Link from 'next/link';

export default function BusinessLineOfCredit(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-28 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase border border-[#0ba5f9]/20">
            Funding Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Business Line of Credit
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          <p className="text-slate-200 text-lg leading-relaxed font-medium">
            We offer business lines of credit with same day approval and funding with minimal requirements and qualifications:
          </p>

          <div className="space-y-4 pt-4 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight uppercase">
              Qualifications and requirements:
            </h2>
            <ul className="space-y-3">
              {[
                "Minimum time in business 6 months",
                "No bankruptcies in past 5 years",
                "Personal credit score 620",
                "No tax liens or judgments unless active payments plan",
                "No more than two outstanding business loans",
                "Online application completed",
                "Complete last 4 months last 4 months of the business bank statements"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base md:text-lg">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 max-w-md">
              Apply online in minutes with our secure intake process. No collateral is required to establish your initial revolving credit line.
            </p>
            <Link href="/apply" className="w-full sm:w-auto">
              <span className="inline-block w-full sm:w-auto text-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
