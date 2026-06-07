"use client";

import React from "react";
import Link from "next/link";

export default function AboutUsPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-20 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase mb-2 border border-[#0ba5f9]/20">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Biggs Funding Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed px-4">
            A full-service commercial brokerage operating with absolute integrity, transparency, and commitment to client success.
          </p>
          <div className="pt-2 px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Get Funded Now
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Detailed Copy */}
          <div className="md:col-span-7 space-y-6 text-slate-300 text-sm md:text-base leading-relaxed px-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Our Vision & Operational Integrity
            </h2>
            <p>
              Biggs Funding Solutions is a full service brokerage firm that operates with the highest level of integrity and transparency in helping merchants of all industries across the United States and Canada get the funding that they need and deserve for their business now and in the future. We have years of experience helping merchants get the funding that they need when they need it we are here.
            </p>
            <p>
              We work with over 50+ lenders and we can provide you with almost any form of business finance that there is. We know the importance of timing and appreciate it. We have an efficient and fast process in getting you funded. We charge no fees at all for helping you to secure the funds that you are looking for to help you take your company to the next level. Because we are compensated by the lenders, so we have an absolute interest in getting you and your business funded. Moreover, we believe that your business is better served by having most or all of the funds borrowed put into the business.
            </p>
            <p>
              We care about you, your business, and your success, and we are here to help you secure the financing you need to grow and maintain your business now and for as long as you need us we are here to help.
            </p>
          </div>

          {/* Right Column - Highlights Box */}
          <div className="md:col-span-5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative mx-2 space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-lg font-bold text-[#0ba5f9] tracking-wider uppercase pb-3 border-b border-slate-800">
              Why Partner With Us?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#0ba5f9]/10 rounded-lg text-[#0ba5f9]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Absolute Integrity</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Transparent terms and contract summaries, verbalized and in writing.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 035.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">50+ Lending Partners</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Institutional matching engines to lock in optimal amortization rules.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">No Advisory Fees</h4>
                  <p className="text-xs text-slate-400 mt-0.5">We charge zero consulting fees. We are compensated entirely by our network lenders.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 012-2h.055M11 20.055V18a2 2 0 00-2-2h-.5a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">North American Coverage</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Proudly servicing businesses across the United States and Canada.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
