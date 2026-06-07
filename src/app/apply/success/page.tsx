"use client";

import React from "react";
import Link from "next/link";

export default function ApplySuccessPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b24] to-[#06153b] text-white flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-brand-navy-light/40 bg-brand-dark/50 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-lg text-white tracking-widest flex flex-col leading-none">
            <span className="text-sm tracking-wider">BIGGS</span>
            <span className="text-xs text-[#0ba5f9] tracking-widest font-extrabold mt-0.5">FUNDING SOLUTIONS</span>
          </Link>
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-smooth">
            Go Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-panel rounded-3xl p-10 border border-slate-800 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

          {/* Success Checkmark Ring */}
          <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 text-emerald-400">
            <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="font-display text-2xl font-black mb-3 text-white">Application Secured</h1>
          <p className="text-slate-350 text-xs mb-8 leading-relaxed">
            Your commercial funding application has been successfully encrypted and filed. Our underwriting desk is active, and your representative will reach out shortly to finalise details.
          </p>

          <div className="space-y-3">
            <Link
              href="/portal"
              className="block w-full py-3 bg-[#0ba5f9] hover:bg-[#008ee3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-smooth shadow-lg shadow-[#0ba5f9]/15"
            >
              Go to Portal Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-800 transition-smooth"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-brand-navy-light/40 bg-brand-dark/20 text-center text-[10px] text-slate-500">
        © 2026 Biggs Funding Solutions. All rights reserved.
      </footer>
    </div>
  );
}
