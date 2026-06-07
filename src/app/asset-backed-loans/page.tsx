import React from "react";
import Link from "next/link";

export default function AssetBackedLoansPage(): React.JSX.Element {
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
            Asset Backed Loans
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Whether you have excellent credit or bad credit and your company need funds to maintain or to grow the business, or you can not get approved for a short term or long term loan or you simply do not want to go down that road, or you don&apos;t have months to wait on a banks approval or denial we have the solution for you. We have lenders that are willing to loan you the money that you need by collateralizing the loan with the equipment of the company. They offer 70% of the liquid value of the equipment with 1 to 3 year terms to repay the loan. The interest charged will vary depending on yours and the companies credit, time in business and industry type. The funding time on this type of loan is 1 to 5 business days. If you have any questions please call us. So do not delay in applying today. Below is a list of what we need to get your business funded.
          </p>

          {/* Requirements List */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight uppercase">
              Needed
            </h2>
            <ul className="space-y-3">
              {[
                "1. Online application completed",
                "2. Pictures of Equipment to be pledged",
                "3. Proof of ownership of equipment ( Title or Bill of sale, invoices, or receipt )",
                "4. Complete last 6 months of the business bank statements",
                "5. Copy of Business voided check",
                "6. Colored copy of driver's license"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 max-w-md">
              Secure financing collateralized by your existing equipment. Click below to submit your application details.
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
