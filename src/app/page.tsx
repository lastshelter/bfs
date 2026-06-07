"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface ActiveDeal {
  readonly city: string;
  readonly state: string;
  readonly amount: number;
  readonly type: string;
  readonly timeAgo: string;
  readonly x: number;
  readonly y: number;
  readonly qX: number;
  readonly qY: number;
}

const MOCK_DEALS: readonly ActiveDeal[] = [
  { city: "Miami", state: "FL", amount: 150000, type: "Business Line of Credit", timeAgo: "2 minutes ago", x: 410, y: 270, qX: 380, qY: 230 },
  { city: "Dallas", state: "TX", amount: 350000, type: "Business Term Loan", timeAgo: "14 minutes ago", x: 230, y: 220, qX: 290, qY: 190 },
  { city: "New York", state: "NY", amount: 500000, type: "Invoice Factoring", timeAgo: "45 minutes ago", x: 440, y: 80, qX: 400, qY: 120 },
  { city: "Los Angeles", state: "CA", amount: 220000, type: "Equipment Leasing", timeAgo: "1 hour ago", x: 50, y: 150, qX: 200, qY: 130 },
];

export default function HomePage(): React.JSX.Element {
  // Calculator States
  const [amount, setAmount] = useState(150000);
  const [creditTier, setCreditTier] = useState<"excellent" | "good" | "fair" | "poor">("good");
  const [businessAge, setBusinessAge] = useState<"less-1" | "1-3" | "3-plus">("1-3");

  // Map Rotation State
  const [activeDealIdx, setActiveDealIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDealIdx((prev) => (prev + 1) % MOCK_DEALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Calculator Logic
  const getCreditMultiplier = () => {
    switch (creditTier) {
      case "excellent": return 1.3;
      case "good": return 1.0;
      case "fair": return 0.7;
      case "poor": return 0.3;
    }
  };

  const getAgeMultiplier = () => {
    switch (businessAge) {
      case "less-1": return 0.75;
      case "1-3": return 1.0;
      case "3-plus": return 1.25;
    }
  };

  const creditScoreMultiplier = getCreditMultiplier();
  const businessAgeMultiplier = getAgeMultiplier();

  const preQualLimit = Math.min(1000000, Math.round(amount * creditScoreMultiplier * businessAgeMultiplier));
  const weeklyPayment = Math.round((preQualLimit * 1.12) / 52);

  const getBaseProbability = () => {
    switch (creditTier) {
      case "excellent": return 92;
      case "good": return 75;
      case "fair": return 45;
      case "poor": return 15;
    }
  };

  const getAgeModifier = () => {
    switch (businessAge) {
      case "less-1": return -15;
      case "1-3": return 0;
      case "3-plus": return 8;
    }
  };

  const approvalProbability = Math.max(5, Math.min(98, getBaseProbability() + getAgeModifier()));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const activeDeal = MOCK_DEALS[activeDealIdx];
  const dashoffset = 251.2 - (251.2 * approvalProbability) / 100;

  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0ba5f9]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-bg pointer-events-none opacity-20" />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 md:pt-28 md:pb-20 px-4 border-b border-slate-900/60 z-10">
        <div className="max-w-5xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold bg-blue-500/10 border border-blue-500/30 text-[#0ba5f9] tracking-widest uppercase mb-6 animate-pulse">
            Secure Commercial Funding Portal
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none mb-6 uppercase">
            We Specialize in Providing <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ba5f9] via-blue-400 to-[#e08b00] drop-shadow-[0_0_15px_rgba(11,165,249,0.2)]">
              Capital for Your Business
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
            Accelerate your operations with institutional credit facilities, equipment leases, and revolving working capital. Fast decisions backed by server-side encryption.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4">
            <Link href="/apply" className="w-full sm:w-auto px-8 py-4 bg-[#0ba5f9] hover:bg-[#008ee3] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0ba5f9]/20 active:scale-[0.98] text-center">
              Apply For Funding
            </Link>
            <Link href="/portal" className="w-full sm:w-auto px-8 py-4 bg-slate-950/70 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-[0.98] text-center">
              Management Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Estimator & Activity Map Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        
        {/* Card 1: Funding Estimator */}
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between group tech-border-glow">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0ba5f9]/0 to-[#0ba5f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="mb-6">
            <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase mb-1">Interactive Calculator</h2>
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Estimate your commercial terms instantly</p>
          </div>

          <div className="space-y-6">
            {/* Input Slider 1: Requested Amount */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-350">Requested Capital</span>
                <span className="text-white font-mono font-bold">{formatCurrency(amount)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-[#0ba5f9] focus:outline-none"
              />
              <div className="flex justify-between text-[9px] text-slate-600 font-bold font-mono">
                <span>$10K</span>
                <span>$500K</span>
                <span>$1M</span>
              </div>
            </div>

            {/* Selector 1: Credit Score Tier */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">Estimated Credit Standing</label>
              <div className="grid grid-cols-4 gap-2">
                {(["poor", "fair", "good", "excellent"] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setCreditTier(tier)}
                    className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      creditTier === tier
                        ? "bg-[#0ba5f9]/15 border-[#0ba5f9] text-[#0ba5f9]"
                        : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector 2: Years in Business */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-350">Time in Operations</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "less-1", label: "< 1 Year" },
                  { key: "1-3", label: "1-3 Years" },
                  { key: "3-plus", label: "3+ Years" },
                ].map((age) => (
                  <button
                    key={age.key}
                    onClick={() => setBusinessAge(age.key as "less-1" | "1-3" | "3-plus")}
                    className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                      businessAge === age.key
                        ? "bg-[#0ba5f9]/15 border-[#0ba5f9] text-[#0ba5f9]"
                        : "bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="mt-8 border-t border-slate-800/80 pt-6 grid grid-cols-3 gap-4 items-center">
            <div className="text-center md:text-left">
              <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Pre-Qual Limit</span>
              <span className="text-base font-black text-[#0ba5f9] font-mono mt-1 block">{formatCurrency(preQualLimit)}</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Weekly Payoff</span>
              <span className="text-base font-black text-amber-500 font-mono mt-1 block">{formatCurrency(weeklyPayment)}/wk</span>
            </div>
            
            {/* Probability Gauge Dial */}
            <div className="flex flex-col items-center justify-center relative">
              <svg className="h-16 w-16 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-slate-950 fill-none" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={approvalProbability > 70 ? "#10b981" : approvalProbability > 40 ? "#e08b00" : "#f43f5e"}
                  strokeWidth="6"
                  strokeDasharray="251.2"
                  strokeDashoffset={dashoffset}
                  pathLength="100"
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-white font-mono">{approvalProbability}%</span>
                <span className="text-[6px] text-slate-500 uppercase font-black tracking-widest">Approval</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive US Capital Flow Activity Map */}
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative flex flex-col justify-between group tech-border-glow">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0ba5f9]/0 to-[#0ba5f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="mb-4">
            <h2 className="text-xs font-black text-[#0ba5f9] tracking-widest uppercase mb-1">Live Capital Allocation Feed</h2>
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Real-time commercial matches nationwide</p>
          </div>

          {/* SVG Abstract USA Map Network Grid */}
          <div className="relative h-60 border border-slate-950 bg-slate-950/60 rounded-2xl overflow-hidden flex items-center justify-center p-2">
            <svg viewBox="0 0 500 300" className="w-full h-full">
              {/* Main Hub Node: Atlanta HQ (350, 190) */}
              <circle cx="350" cy="190" r="6" fill="#e08b00" className="shadow-[0_0_10px_#e08b00] cursor-pointer" />
              <circle cx="350" cy="190" r="16" fill="none" stroke="#e08b00" strokeWidth="1" className="animate-ping" style={{ animationDuration: "3s" }} />

              {/* Connecting Beams to Active Deal */}
              {activeDeal && (
                <>
                  <path
                    d={`M ${activeDeal.x} ${activeDeal.y} Q ${activeDeal.qX} ${activeDeal.qY} 350 190`}
                    fill="none"
                    stroke="#0ba5f9"
                    strokeWidth="1.5"
                    className="animate-draw-path opacity-80"
                  />
                  <circle cx={activeDeal.x} cy={activeDeal.y} r="5" fill="#0ba5f9" />
                  <circle cx={activeDeal.x} cy={activeDeal.y} r="1" className="animate-pulse-glow fill-[#0ba5f9]" />
                </>
              )}

              {/* City Dots (Inactive states are dimmed) */}
              {MOCK_DEALS.map((deal, idx) => {
                const isActive = idx === activeDealIdx;
                return (
                  <g key={deal.city} className="cursor-pointer" onClick={() => setActiveDealIdx(idx)}>
                    <circle
                      cx={deal.x}
                      cy={deal.y}
                      r="4"
                      className={`transition-all duration-500 ${isActive ? "fill-[#0ba5f9] r-5" : "fill-slate-700 hover:fill-slate-500"}`}
                    />
                    <text
                      x={deal.x + 8}
                      y={deal.y + 3}
                      className={`text-[8px] font-mono font-bold select-none ${isActive ? "fill-white" : "fill-slate-600"}`}
                    >
                      {deal.city}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-850">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Sync Active</span>
            </div>
          </div>

          {/* Highlight Sidebar Deal Details */}
          {activeDeal && (
            <div className="mt-6 p-4 bg-slate-950/70 border border-slate-850 rounded-2xl flex justify-between items-center transition-all duration-500 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active File Allocation</span>
                <div className="text-xs font-black text-white uppercase">{activeDeal.city}, {activeDeal.state}</div>
                <div className="text-[10px] font-semibold text-slate-400">{activeDeal.type}</div>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase tracking-widest">{activeDeal.timeAgo}</span>
                <span className="text-sm font-black text-[#0ba5f9] font-mono">{formatCurrency(activeDeal.amount)}</span>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* Core Product Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
            Our Commercial Lending Portfolios
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-[#0ba5f9] to-[#e08b00] mx-auto mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Line of Credit", desc: "Flexible revolving capital pools on-demand.", href: "/business-line-of-credit", border: "border-blue-500/20" },
            { title: "Term Loans", desc: "Predictable structured growth facilities.", href: "/term-loans", border: "border-emerald-500/20" },
            { title: "SBA Financing", desc: "Elite government-backed prime tier notes.", href: "/sba-loans", border: "border-purple-500/20" }
          ].map((prod, idx) => (
            <Link key={idx} href={prod.href} className="group block">
              <div className={`h-full bg-slate-900/40 border ${prod.border} rounded-2xl p-6 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]`}>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#0ba5f9] transition-colors uppercase tracking-tight">{prod.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prod.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
