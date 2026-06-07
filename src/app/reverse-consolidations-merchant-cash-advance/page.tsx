"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ReverseConsolidationsPage(): React.JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How will this affect my credit?",
      a: "This program does not require hard credit checks that damage your score. In fact, by providing the liquidity needed to satisfy your current advances on time, it actively protects your credit from default marks."
    },
    {
      q: "How many advances can I consolidate at a time?",
      a: "We can typically cover multiple positions. Our underwriters assess the total daily payment burden and structure the weekly disbursements to cover all qualifying open advances."
    },
    {
      q: "Can I net additional funds under this program?",
      a: "Yes! If your business has strong underlying cash flow and a healthy operating history, you may qualify to receive additional net working capital on top of the consolidation disbursements."
    },
    {
      q: "What if I just take out another advance?",
      a: "Taking out another traditional advance (known as stacking) increases your daily payment load, increasing default risk. A reverse consolidation reduces your daily payment load by 30% to 50%, saving your cash flow."
    },
    {
      q: "How much can I REALLY save?",
      a: "Most businesses experience immediate, verifiable cash flow savings of 30% to 50% relative to their existing daily repayment obligations."
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(224,139,0,0.05),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-emerald-500/10 text-emerald-400 tracking-wide uppercase mb-2 border border-emerald-500/20">
            Cash Flow Protection
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
            Reverse <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Consolidations</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-350 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            Protect your business from the cash flow strain of multiple open merchant cash advances. Save 30% &ndash; 50% in daily payments.
          </p>
          <div className="pt-2 px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Consolidate Advances Now
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Details Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Copy and stat grid) */}
          <div className="md:col-span-7 space-y-8 px-2">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                An Alternative to Stacking High-Cost Advances
              </h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Business owners with multiple Cash Advance positions can find themselves caught in a dangerous cycle of taking out more and more Merchant Cash Advances to avoid defaulting on existing balances.
              </p>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                Reverse Consolidations provide business owners with weekly disbursements directly into their business bank account to satisfy the cost of their existing Cash Advance payments. The consolidation functions like a single Merchant Cash Advance and is repaid with automatic daily withdrawals at a reduced amount against the outstanding positions.
              </p>
              <p className="text-sm md:text-base text-slate-355 leading-relaxed font-semibold text-emerald-450">
                * Note: This is not debt restructuring or loan consolidation and does not restructure your debt. Instead, it frees up critical cash flow by reducing daily payments, providing immediate cash flow savings of 30% to 50%.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-[#0ba5f9] uppercase tracking-wider block mb-1">Funding Limits</span>
                <span className="text-2xl font-extrabold text-white">$5K – $500K</span>
                <p className="text-xs text-slate-400 mt-1">Consolidation size scaled to your total open debt.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block mb-1">Weekly Disbursements</span>
                <span className="text-2xl font-extrabold text-white">Direct ACH</span>
                <p className="text-xs text-slate-400 mt-1">Disbursed directly to cover your daily splits.</p>
              </div>
              <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl">
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block mb-1">Funding Speed</span>
                <span className="text-2xl font-extrabold text-white">Under 24h</span>
                <p className="text-xs text-slate-400 mt-1">Fast execution upon complete document package.</p>
              </div>
            </div>
          </div>

          {/* Right Column (Parameters & Requirements Card) */}
          <div className="md:col-span-5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg font-bold text-[#0ba5f9] tracking-wider uppercase mb-6 pb-3 border-b border-slate-800">
              Lending Guidelines
            </h3>
            
            <ul className="space-y-4">
              {[
                "Online application completed",
                "Separate balances provided for each open merchant cash advance",
                "Minimum personal credit score of 500+ FICO",
                "Minimum operational history of 1+ years in business",
                "Recent bank statements showing deposit consistency",
                "Direct debit authorization for daily repayments"
              ].map((requirement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200 font-medium text-sm md:text-base">
                  <span className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-[#0ba5f9] shadow-[0_0_8px_rgba(11,165,249,0.6)]" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6 max-w-4xl mx-auto pt-8">
          <h3 className="text-2xl font-bold text-white tracking-tight text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-white hover:text-emerald-400 transition"
                  >
                    <span>{faq.q}</span>
                    <span className={`transform transition duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-40 border-t border-slate-850" : "max-h-0"}`}>
                    <p className="p-5 text-sm text-slate-350 leading-relaxed bg-slate-950/10">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
