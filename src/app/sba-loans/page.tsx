import React from "react";
import Link from "next/link";

export default function SbaLoansPage(): React.JSX.Element {
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
            SBA Loans
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
          
          {/* Unsecured SBA Loans */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">
              Unsecured SBA LOANS
            </h2>
            <ul className="space-y-2">
              {[
                "Loan amounts up to $ 5,000,000. 00",
                "Rates 6.25% APR to 8.50% APR PLUS PRIME RATE 2.75%",
                "Terms 10 to 25 years",
                "Monthly repayment",
                "No prepayment penalties"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-350 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">
              Required Documents
            </h2>
            <ul className="space-y-2">
              {[
                "Online application completed",
                "Last 3 years of business and personal tax returns",
                "Year to Date P&L and Balance sheet for the year apply for loan",
                "Complete last 6 months of the business bank statements",
                "Attached Debt Schedule completed listing all business debt loans and credit cards etc…"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-355 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What are the basic requirements */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-xl font-bold text-[#0ba5f9] tracking-tight">
              What are the basic requirements?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Businesses that qualify for an SBA loan from a marketplace bank typically have more than $100,000 in annual revenue. Most of our businesses are profitable and cash flow positive. All are able to show that they can afford to make our monthly loan payments.
            </p>
          </div>

          {/* SBA 7(a) Working Capital or Debt Consolidation Loans */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-white tracking-tight">
              SBA 7(a) Working Capital or Debt Consolidation Loans from $30,000 to $350,000
            </h2>
            <ul className="space-y-2">
              {[
                "Minimum 2 years in business",
                "U.S. based business owned by US citizen or Lawful Permanent Resident who is at least 21 years’ old",
                "Good personal credit score of 640 or higher",
                "No outstanding tax liens",
                "No bankruptcies & foreclosures in the past 3 years",
                "No recent charge-offs or settlements",
                "Current on government-related loans"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SBA 7(a) Commercial Real Estate Loans */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-white tracking-tight">
              SBA 7(a) Commercial Real Estate Loans from $500,000 to $5 million
            </h2>
            <ul className="space-y-2">
              {[
                "The real estate must be majority owner-occupied. This means that at least 51% of the square footage of the property you’re buying must be occupied by and used by your business.",
                "Time in Business: 2+ Years",
                "Business owners must have personal credit scores above 660",
                "Cash Flow: Sufficient business and personal cash flow to service all debt payments demonstrated by 3 years of tax returns and interim financial data",
                "SBA Specific Requirements: No delinquencies and/or default on government loans"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 text-base">
                  <span className="mt-2 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Do I need to personally guarantee the loan */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-[#0ba5f9] tracking-tight">
              Do I need to personally guarantee the loan?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              All business owners who own 20% or more of the business must provide a personal guarantee. Married couples who collectively own 20% or more of the business when their shares are combined, must both provide a personal guarantee.
            </p>
          </div>

          {/* What industries are eligible */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-[#0ba5f9] tracking-tight">
              What industries are eligible?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              From a hair salon to an online retailer to an accounting firm – there are many small businesses that are eligible for an SBA Loan and most industries are eligible. Industries that are excluded include gambling, lending, life insurance, religious teaching, primarily political and lobbying activities, oil wildcatting, mining, mortgage servicing, real estate development, bail bond, pawn or private clubs, among others.
            </p>
          </div>

          {/* What can I use my funds for */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-[#0ba5f9] tracking-tight">
              What can I use my funds for?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Need new equipment? Is it time to hire another employee? Would you like to purchase or refinance commercial real estate? You can use your funds in a variety of ways depending how much you&apos;re borrowing.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="space-y-1">
                <span className="font-bold text-white block">$30,000 to $350,000:</span>
                <span className="text-slate-350 block leading-relaxed">
                  Loans of this amount can be used for working capital (such as operational expenses, marketing, hiring, etc.), new equipment purchases, and to refinance existing business debt not secured by real estate (such as cash advances, business loans, and equipment leases).
                </span>
              </li>
              <li className="space-y-1 pt-2">
                <span className="font-bold text-white block">$500,000 - $5 million:</span>
                <span className="text-slate-350 block leading-relaxed">
                  Loans of this amount can be used for the purchase or refinance of commercial real estate. To qualify, the real estate must be majority owner-occupied. This means at least 51% of the square footage of the property being purchased must be occupied by and used by your business.
                </span>
              </li>
            </ul>
          </div>

          {/* Turned down before */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-[#0ba5f9] tracking-tight">
              I’ve been turned down by my bank before. Can I still get an SBA loan?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Yes. We have helped many small businesses obtain an SBA loan from a marketplace bank even after they have been turned down by other banks.
            </p>
          </div>

          {/* Second SBA loan */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h2 className="text-lg font-bold text-[#0ba5f9] tracking-tight">
              Can I get a second SBA loan?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Yes, many customers get a second SBA loan as their business grows and needs additional capital. If you receive approval for more than one SBA loan within 90 days of each other, the loans will be treated as if they were one loan for purposes of determining the amount of the SBA guarantee fees, if any.
            </p>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 max-w-md">
              Secure the gold standard of business financing today. Click below to begin your SBA pre-qualification check.
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
