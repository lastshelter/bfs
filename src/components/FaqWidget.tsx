"use client";

import React, { useState, useEffect } from "react";

interface FaqItem {
  readonly q: string;
  readonly a: string;
}

const FAQ_DATA: readonly FaqItem[] = [
  {
    q: "How fast can I receive funding?",
    a: "Our underwriting desk issues term sheets within 2 to 4 hours of submission. Once contracts are signed and bank verification succeeds, capital is wired within 24 hours.",
  },
  {
    q: "What interest rates do you offer?",
    a: "Factor rates start at 1.11 for working capital facilities. SBA facilities range from Prime + 2.0% to Prime + 4.75%, determined by your credit tier and business age.",
  },
  {
    q: "Is real estate collateral required?",
    a: "Lines of credit and business loans under $250,000 are unsecured and require no real estate collateral. Larger SBA facilities may secure business asset liens.",
  },
];

export default function FaqWidget(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [typedText, setTypedText] = useState("");

  // Typewriter effect simulation
  useEffect(() => {
    if (activeIdx === null) {
      const timer = setTimeout(() => setTypedText(""), 0);
      return () => clearTimeout(timer);
    }
    const fullText = FAQ_DATA[activeIdx]?.a || "";
    let charIdx = 0;
    const resetTimer = setTimeout(() => setTypedText(""), 0);

    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(charIdx));
      charIdx++;
      if (charIdx >= fullText.length) {
        clearInterval(interval);
      }
    }, 12); // fast typing speed

    return () => {
      clearTimeout(resetTimer);
      clearInterval(interval);
    };
  }, [activeIdx]);

  return (
    <div className="fixed bottom-6 right-6 z-[110] font-sans text-xs select-none text-left">
      {/* Floating launcher badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 text-[#0ba5f9] flex items-center justify-center shadow-2xl hover:border-[#0ba5f9]/50 hover:shadow-[#0ba5f9]/10 transition-all duration-300 active:scale-[0.95] cursor-pointer relative group"
        >
          <div className="absolute inset-0 rounded-full border border-[#0ba5f9]/30 animate-ping pointer-events-none group-hover:animate-none" />
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}

      {/* FAQ Dashboard Console */}
      {isOpen && (
        <div className="w-80 bg-slate-950/95 border border-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-card-entrance select-text">
          {/* Header */}
          <div className="border-b border-slate-850 bg-slate-900/55 px-4 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0ba5f9] animate-pulse" />
              <span className="font-display font-black text-slate-100 uppercase tracking-widest text-[9px]">Fast-Track Support</span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setActiveIdx(null); }}
              className="text-slate-500 hover:text-white text-[10px] font-black uppercase cursor-pointer"
            >
              Close
            </button>
          </div>

          {/* List or Detail view */}
          <div className="p-4 min-h-[160px] flex flex-col justify-between gap-4">
            {activeIdx === null ? (
              <div className="space-y-2.5">
                <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Common Inquiries</span>
                {FAQ_DATA.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className="w-full text-left p-3 bg-slate-900/40 border border-slate-850 hover:border-[#0ba5f9]/30 hover:bg-slate-900/80 rounded-xl transition-all cursor-pointer text-[10px] font-bold text-slate-350 hover:text-white"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">Question</span>
                  <div className="text-[10px] font-bold text-white mt-0.5">{FAQ_DATA[activeIdx]?.q || ""}</div>
                </div>
                <div>
                  <span className="block text-[8px] font-mono font-bold text-[#0ba5f9] uppercase tracking-widest">Advisor Response</span>
                  <p className="text-[10px] text-slate-300 mt-1 leading-relaxed min-h-[40px] font-mono select-text">
                    {typedText}
                    <span className="inline-block w-1.5 h-3.5 bg-[#0ba5f9]/80 ml-0.5 animate-pulse" />
                  </p>
                </div>
                <button
                  onClick={() => setActiveIdx(null)}
                  className="text-[9px] font-black uppercase text-[#e08b00] hover:underline cursor-pointer flex items-center gap-1"
                >
                  ← Back to questions
                </button>
              </div>
            )}
            
            <div className="border-t border-slate-900/60 pt-3 flex justify-between items-center text-[7px] text-slate-600 font-bold uppercase tracking-widest select-none">
              <span>System Desk v1.4</span>
              <span>Secure Connection</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
