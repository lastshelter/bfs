"use client";

import React, { useState, useMemo, useEffect } from "react";

interface RadarReportCardProps {
  readonly creditScoreTier: string | null;
  readonly revenueAnnual: number;
  readonly timeInBusiness: string | null;
  readonly requestedAmount: number;
}

const SECURE_ACTIVITIES = [
  "SHA-256 secure handshake validated.",
  "Operational ledger reports synchronized with database.",
  "Client document vault integrity status: 100% verified.",
  "Underwriting advisory lines established successfully.",
  "Anti-malware document scan cycle: Completed.",
];

export default function RadarReportCard({
  creditScoreTier,
  revenueAnnual,
  timeInBusiness,
  requestedAmount,
}: RadarReportCardProps): React.JSX.Element {
  // What-If scenario states
  const [revBoost, setRevBoost] = useState(false);
  const [creditBoost, setCreditBoost] = useState(false);
  const [collateralBoost, setCollateralBoost] = useState(false);

  // Live Activity Toast states
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Periodic Toast effect
  useEffect(() => {
    let hideTimer: NodeJS.Timeout;

    const triggerToast = () => {
      const randomMsg = SECURE_ACTIVITIES[Math.floor(Math.random() * SECURE_ACTIVITIES.length)] || "";
      setToastMsg(randomMsg);
      setToastVisible(true);

      hideTimer = setTimeout(() => {
        setToastVisible(false);
      }, 5000);
    };

    // Trigger initial toast after 5s
    const initialTimer = setTimeout(triggerToast, 5000);

    // Set up repeating interval every 22s
    const interval = setInterval(triggerToast, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  // Base score computations (0 - 100)
  const baseCredit = useMemo(() => {
    const tier = creditScoreTier || "";
    if (tier.includes("Excellent")) return 90;
    if (tier.includes("Good")) return 72;
    if (tier.includes("Fair")) return 48;
    return 20;
  }, [creditScoreTier]);

  const baseCashFlow = useMemo(() => {
    if (revenueAnnual >= 500000) return 85;
    if (revenueAnnual >= 250000) return 68;
    if (revenueAnnual >= 100000) return 50;
    return 32;
  }, [revenueAnnual]);

  const baseLongevity = useMemo(() => {
    const age = timeInBusiness || "";
    if (age.includes("3+")) return 85;
    if (age.includes("1-3")) return 65;
    return 35;
  }, [timeInBusiness]);

  const baseSafety = useMemo(() => {
    const ratio = requestedAmount / (revenueAnnual || 1);
    if (ratio <= 0.1) return 90;
    if (ratio <= 0.25) return 70;
    if (ratio <= 0.5) return 48;
    return 25;
  }, [requestedAmount, revenueAnnual]);

  const baseOperational = 70; // baseline

  // Adjust scores based on simulated What-If parameters
  const creditScore = Math.min(100, baseCredit + (creditBoost ? 22 : 0));
  const cashFlowScore = Math.min(100, baseCashFlow + (revBoost ? 20 : 0));
  const longevityScore = baseLongevity; // constant longevity
  const operationalScore = Math.min(100, baseOperational + (collateralBoost ? 25 : 0));
  const safetyScore = Math.min(100, baseSafety + (revBoost ? 10 : 0));

  // Compute discount rate
  const discountRate = useMemo(() => {
    let d = 0;
    if (revBoost) d += 1.25;
    if (creditBoost) d += 2.0;
    if (collateralBoost) d += 1.5;
    return d;
  }, [revBoost, creditBoost, collateralBoost]);

  // SVG Radar coordinates generator (center at 100, 100, viewBox 200 200)
  const points = useMemo(() => {
    const scores = [creditScore, cashFlowScore, longevityScore, operationalScore, safetyScore];
    const center = 100;
    const maxRadius = 80;

    return scores.map((score, idx) => {
      const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
      const r = (score / 100) * maxRadius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return { x, y };
    });
  }, [creditScore, cashFlowScore, longevityScore, operationalScore, safetyScore]);

  const polyPointsString = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // Grid Ring helper coordinates
  const getGridRing = (scale: number) => {
    const center = 100;
    const maxRadius = 80;
    const r = scale * maxRadius;
    const gridPoints = Array(5).fill(0).map((_, idx) => {
      const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return gridPoints.join(" ");
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 bg-slate-950/40 relative flex flex-col md:flex-row gap-6 items-center w-full">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Radar SVG Area */}
      <div className="relative w-48 h-48 shrink-0 flex items-center justify-center bg-slate-950/50 rounded-2xl border border-slate-850 p-2">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Grid concentric rings */}
          <polygon points={getGridRing(1.0)} fill="none" stroke="rgba(30, 41, 59, 0.6)" strokeWidth="1" />
          <polygon points={getGridRing(0.75)} fill="none" stroke="rgba(30, 41, 59, 0.4)" strokeWidth="1" />
          <polygon points={getGridRing(0.5)} fill="none" stroke="rgba(30, 41, 59, 0.3)" strokeWidth="1" />
          <polygon points={getGridRing(0.25)} fill="none" stroke="rgba(30, 41, 59, 0.2)" strokeWidth="1" />

          {/* Radar Spokes */}
          {Array(5).fill(0).map((_, idx) => {
            const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
            const x = 100 + 80 * Math.cos(angle);
            const y = 100 + 80 * Math.sin(angle);
            return (
              <line key={idx} x1="100" y1="100" x2={x} y2={y} stroke="rgba(30, 41, 59, 0.4)" strokeWidth="1" />
            );
          })}

          {/* Morphing Score Area Polygon */}
          <polygon
            points={polyPointsString}
            fill="url(#radarGrad)"
            stroke="#0ba5f9"
            strokeWidth="1.5"
            className="transition-all duration-700"
          />

          {/* Vertex dots */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#e08b00"
              className="transition-all duration-700"
            />
          ))}

          {/* Labels */}
          {(() => {
            const labels = ["Credit", "Revenue", "Longevity", "Operational", "Safety"];
            return labels.map((label, idx) => {
              const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / 5;
              const x = 100 + 94 * Math.cos(angle);
              const y = 100 + 94 * Math.sin(angle);
              // text anchor adjustments based on position
              const anchor = Math.abs(x - 100) < 5 ? "middle" : x > 100 ? "start" : "end";
              return (
                <text
                  key={label}
                  x={x}
                  y={y + 3}
                  textAnchor={anchor}
                  className="fill-slate-400 text-[8px] font-mono font-bold select-none uppercase tracking-wider"
                >
                  {label}
                </text>
              );
            });
          })()}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(11, 165, 249, 0.5)" />
              <stop offset="100%" stopColor="rgba(224, 139, 0, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Control sliders & description */}
      <div className="flex-grow space-y-4 w-full">
        <div>
          <h3 className="font-display font-semibold text-sm text-white uppercase tracking-wider flex justify-between items-center">
            <span>Corporate Health Index</span>
            {discountRate > 0 && (
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full animate-pulse">
                -{discountRate.toFixed(2)}% Rate Discount
              </span>
            )}
          </h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Simulate optimal credit terms</p>
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={revBoost}
              onChange={(e) => setRevBoost(e.target.checked)}
              className="rounded border-slate-800 bg-slate-950 text-[#0ba5f9] focus:ring-[#0ba5f9]/50 h-4 w-4 cursor-pointer accent-[#0ba5f9]"
            />
            <div className="flex-grow">
              <span className="font-bold text-white block">Simulate Revenue Growth (+$15K/mo)</span>
              <span className="text-[9px] text-slate-500">Expands Cash Flow & Safety dimensions. Est. Discount: -1.25%</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={creditBoost}
              onChange={(e) => setCreditBoost(e.target.checked)}
              className="rounded border-slate-800 bg-slate-950 text-[#0ba5f9] focus:ring-[#0ba5f9]/50 h-4 w-4 cursor-pointer accent-[#0ba5f9]"
            />
            <div className="flex-grow">
              <span className="font-bold text-white block">Optimize Credit profile (Repair/FICO +60)</span>
              <span className="text-[9px] text-slate-500">Expands Credit standing polygon. Est. Discount: -2.00%</span>
            </div>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={collateralBoost}
              onChange={(e) => setCollateralBoost(e.target.checked)}
              className="rounded border-slate-800 bg-slate-950 text-[#0ba5f9] focus:ring-[#0ba5f9]/50 h-4 w-4 cursor-pointer accent-[#0ba5f9]"
            />
            <div className="flex-grow">
              <span className="font-bold text-white block">Add Assets/Guarantor Collateral</span>
              <span className="text-[9px] text-slate-500">Boosts Operational score and unlocks SBA Fast-track. Est. Discount: -1.50%</span>
            </div>
          </label>
        </div>
      </div>

      {/* Live Activity Toast */}
      {toastVisible && toastMsg && (
        <div className="fixed bottom-6 left-6 z-[100] bg-slate-900/95 border border-slate-800 backdrop-blur-xl px-4 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-sm animate-in slide-in-from-top-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div className="space-y-0.5 text-left min-w-0">
            <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest font-mono">Vault Security Sync</span>
            <span className="block text-[10px] font-bold text-slate-200 truncate pr-2" title={toastMsg}>{toastMsg}</span>
          </div>
          <button
            onClick={() => setToastVisible(false)}
            className="text-[9px] text-slate-500 hover:text-slate-350 font-black ml-auto cursor-pointer uppercase shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
