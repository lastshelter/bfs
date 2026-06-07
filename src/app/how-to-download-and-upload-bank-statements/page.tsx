"use client";

import React from "react";
import Link from "next/link";

export default function HowToDownloadAndUploadBankStatementsPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-24 px-4 border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-amber-500/10 text-amber-500 tracking-wide uppercase border border-amber-500/20">
            Document Upload Guide
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How to Download & Upload <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Bank Statements</span>
          </h1>
          <p className="text-base md:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Follow our simple instructions to secure and submit the 4 months of statements required to process your commercial funding application.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 relative flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-3xl font-extrabold text-[#0ba5f9]/30 block mb-4">01</span>
              <h3 className="text-lg font-bold text-white mb-3">Download Statements</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Log in to your business bank&apos;s online portal. Locate the account statements section and download the complete past <span className="text-white font-semibold">4 months</span> of statements as PDF files onto your device.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/40 text-xs text-slate-400">
              * Make sure all pages of each statement are included.
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 relative flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-3xl font-extrabold text-amber-500/30 block mb-4">02</span>
              <h3 className="text-lg font-bold text-white mb-3">Attach to Application</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                While completing our secure online application form, look for the document upload link. You can drag and drop or select your downloaded bank statement files to upload them directly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/40 text-xs text-slate-400">
              * Fully encrypted AES-256-GCM upload.
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 relative flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-3xl font-extrabold text-emerald-500/30 block mb-4">03</span>
              <h3 className="text-lg font-bold text-white mb-3">Alternative Submission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If uploading directly is not convenient, you can attach the statements to a separate email and send them to your designated BFS representative, or submit them via fax.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/40 text-xs text-slate-400">
              * Whichever method is most convenient for you.
            </div>
          </div>

        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900/60 to-slate-950/60 border border-slate-850 rounded-2xl p-8 md:p-12 text-center space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">Ready to Submit Your Application?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Once you have your statements downloaded, complete our secure 4-step wizard to initiate underwriting.
          </p>
          <div className="pt-2">
            <Link href="/apply">
              <span className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer">
                Start Secure Application
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
