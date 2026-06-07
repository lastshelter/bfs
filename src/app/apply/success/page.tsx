"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent(): React.JSX.Element {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [copied, setCopied] = useState(false);

  const getTrackingUrl = () => {
    if (typeof window !== "undefined" && token) {
      return `${window.location.origin}/portal/track?token=${encodeURIComponent(token)}`;
    }
    return "";
  };

  const handleCopy = () => {
    const url = getTrackingUrl();
    if (url) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy link:", err));
    }
  };

  const trackingUrl = getTrackingUrl();

  return (
    <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl text-center relative overflow-hidden animate-card-entrance hover:border-slate-700/60 transition-all duration-500 group">
      {/* Inner radial card glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0ba5f9]/0 via-[#0ba5f9]/0 to-[#0ba5f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      {/* Success Checkmark Ring */}
      <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 text-emerald-400">
        <svg className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-display font-black text-2xl tracking-tight text-white mb-3 leading-tight uppercase">
        Application Secured
      </h1>
      <p className="text-slate-350 text-xs mb-6 leading-relaxed">
        Your commercial funding application has been successfully encrypted and filed. Our underwriting desk is active, and your representative will reach out shortly.
      </p>

      {token && (
        <div className="mb-8 border border-slate-800 bg-slate-950/60 p-5 rounded-2xl space-y-3 text-left">
          <span className="block text-[10px] font-bold text-[#0ba5f9] uppercase tracking-wider">
            Secure Tracking Link
          </span>
          <p className="text-[10px] text-slate-400 leading-normal">
            Bookmark this encrypted link to track your underwriter status updates and upload additional requested files.
          </p>
          <div className="flex gap-2 items-center bg-slate-950 border border-slate-850 p-2 rounded-xl">
            <input
              type="text"
              readOnly
              value={trackingUrl}
              className="bg-transparent text-[10px] text-slate-300 font-mono outline-none flex-grow min-w-0 select-all"
            />
            <button
              onClick={handleCopy}
              className={`shrink-0 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-all ${
                copied
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Link
          href="/"
          className="block w-full py-3 bg-[#0ba5f9] hover:bg-[#008ee3] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-lg hover:shadow-[#0ba5f9]/15 active:scale-[0.98]"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function ApplySuccessPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#020b24] text-white flex flex-col justify-between selection:bg-blue-500/30 relative overflow-hidden">
      {/* Animated Background Glowing Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0ba5f9]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-bg pointer-events-none opacity-40" />

      {/* Header */}
      <header className="border-b border-slate-800/80 bg-[#020b24]/40 backdrop-blur-md px-6 py-4 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-sans font-black text-lg text-white tracking-widest flex flex-col leading-none hover:text-[#0ba5f9] transition-colors">
            <span className="text-sm tracking-wider">BIGGS</span>
            <span className="text-xs text-[#0ba5f9] tracking-widest font-extrabold mt-0.5">FUNDING SOLUTIONS</span>
          </Link>
          <Link href="/" className="text-xs text-slate-450 hover:text-white transition-colors uppercase font-bold tracking-wider">
            Go Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <Suspense
          fallback = {
            <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl text-center flex flex-col items-center justify-center">
              <span className="h-8 w-8 rounded-full border border-t-transparent border-[#0ba5f9] animate-spin mb-4" />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading application link...</p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-850/80 bg-[#020b24]/40 text-center text-[10px] text-slate-500 z-10">
        © 2026 BIGGS FUNDING SOLUTIONS. Secure Operational Client Gateway.
      </footer>
    </div>
  );
}
