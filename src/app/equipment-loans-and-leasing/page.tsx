import React from "react";
import Link from "next/link";

export default function EquipmentLoansAndLeasingPage(): React.JSX.Element {
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
            Equipment Loans and Equipment Leasing
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
            <p>
              Equipment loans and leasing can be good for merchants who cannot afford or do not want to purchase their equipment outright themselves we work with lenders that provide several forms of equipment financing. The average term on an equipment loan or equipment leasing program is 1 to 5 years and rates can vary from 4% to 50% depending on the merchant’s credit score and his or her credit worthiness.
            </p>
            <p>
              An equipment loan allows you to pay for the equipment over time and own the equipment at the end of the term and the loan is secured by the purchased equipment, so if the merchant defaults on the loan the lender will take possession of the equipment.
            </p>
            <p>
              In equipment leasing there is generally two forms of equipment finance one is leasing the equipment from the lender with the option to purchase the equipment at fair market value at the end of the lease and then there is leasing where the merchant returns the equipment at the end of the lease or has the option to renew the lease.
            </p>
            <p className="font-semibold text-white">
              The following information is required to get an equipment loan or lease programs:
            </p>
          </div>

          {/* Tier 1 */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight uppercase">
              Equipment Loan or Lease up to 150K
            </h2>
            <ul className="space-y-3">
              {[
                "Application for finance completed",
                "Quote from Seller",
                "Purchasing from private party bill of sell needed",
                "Complete last 4 months of the business bank statements",
                "Minimum credit score 600"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight uppercase">
              Equipment Loan or Lease above 150K to 10mil
            </h2>
            <ul className="space-y-3">
              {[
                "Application for finance completed",
                "Quote from Seller",
                "Purchase from private party bill of sell needed",
                "Complete last 4 months of the business bank statements",
                "2 years of business tax returns and current year P&L and Balance Sheet"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight uppercase">
              Credit Challenged Equipment Loan or Lease up to 75K
            </h2>
            <ul className="space-y-3">
              {[
                "Application for funding",
                "Quote from Seller",
                "Purchase from private party bill of sell needed",
                "Complete last 4 months of the business bank statements"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-800/60">
            <p className="text-sm font-semibold text-emerald-400">
              * Approval and funding time 24 to 48 hours from time of full submission.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 max-w-md">
              Secure the vital equipment your business needs to grow. Click below to submit your application details.
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
