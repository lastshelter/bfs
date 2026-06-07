import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020b24] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* 🌌 MOBILE-BALANCED HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-32 px-4 border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.06),transparent_50%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-blue-500/10 text-[#0ba5f9] tracking-wide uppercase mb-5 border border-blue-500/20">
            Commercial Capital Marketplace
          </span>
          {/* Constrained text sizing specifically for mobile screens */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 px-2">
            We Specialize in Providing <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-blue-400">Funding for Your Business</span>
          </h1>
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed px-4">
            Quick and easy access to institutional capital facilities to help take your corporate operations to the next step today.
          </p>
          <div className="px-4">
            <Link href="/apply">
              <span className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base md:text-lg rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 🛠️ CORE PRODUCT QUICK-ACCESS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <h2 className="text-xl md:text-3xl font-bold text-center text-white mb-10 tracking-tight">
          Our Commercial Lending Portfolios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Line of Credit", desc: "Flexible revolving capital pools on-demand.", href: "/business-line-of-credit", border: "border-blue-500/20" },
            { title: "Term Loans", desc: "Predictable structured growth facilities.", href: "/term-loans", border: "border-emerald-500/20" },
            { title: "SBA Financing", desc: "Elite government-backed prime tier notes.", href: "/sba-loans", border: "border-purple-500/20" }
          ].map((prod, idx) => (
            <Link key={idx} href={prod.href} className="group block">
              <div className={`h-full bg-slate-900/40 border ${prod.border} rounded-xl p-6 hover:bg-slate-900/80 transition-all duration-200 cursor-pointer shadow-lg`}>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#0ba5f9] transition-colors">{prod.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{prod.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
