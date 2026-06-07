import React from "react";
import Link from "next/link";

export default function MerchantCashAdvancePage(): React.JSX.Element {
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
            Merchant Cash Advance
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            A Merchant Cash Advance is a short term unsecured loan provided to a merchant in advance of his or her future business. The loan is then repaid in two different ways either through the merchant’s credit card sales by taking a small percentage of the daily transactions or by ACH debiting the merchants business bank account either once a business day or once a week until the funds are repaid. These type of loans are usually 3 to 18 months to repay the funds and do not require business and personal financials or collateral like traditional funding all that is required is the following:
          </p>

          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <ul className="space-y-3">
              {[
                "Minimum of 3 months or longer in business",
                "Complete last 4 months of the business bank statements showing business activity",
                "Minimum credit score 475",
                "Must be 18 years old or older",
                "Proof of Ownership of business",
                "Valid state or government issued ID",
                "US Citizen or legal resident or green card status",
                "Online application completed"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800/60 text-sm text-slate-400 leading-relaxed">
            <p>
              *Note: Rates and terms will vary depending on the merchant’s credit worthiness, time in business, industry type and other factors that are considered. For more details, please contact us and a representative will answer all of your questions and assist you through the funding process.
            </p>
            <p>
              Finally, you can apply here by clicking onto the link below and completing the online application.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex justify-center">
            <Link href="/apply" className="w-full sm:w-auto text-center">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                Apply Now
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
