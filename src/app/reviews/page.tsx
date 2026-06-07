"use client";

import React from "react";
import Link from "next/link";

interface Review {
  name: string;
  date: string;
  rating: number;
  title: string;
  body: string;
}

export default function ReviewsPage(): React.JSX.Element {
  const sampleReviews: Review[] = [
    {
      name: "Marcus T.",
      date: "April 5, 2026",
      rating: 5,
      title: "Saved our operations cash flow",
      body: "We had three open advances and the daily payments were crushing our margins. Biggs Funding Solutions structured a reverse consolidation that cut our daily payment burden by 40%. Incredible service and speed."
    },
    {
      name: "Sarah Jenkins",
      date: "March 31, 2026",
      rating: 5,
      title: "Extremely fast approval process",
      body: "Our logistics firm needed $150k for new equipment immediately. BFS got us approved and funded in less than 48 hours. No hidden fees or advisory charges, they were paid directly by the lender network."
    },
    {
      name: "David K.",
      date: "February 10, 2026",
      rating: 5,
      title: "Integrity you can trust",
      body: "Unlike other brokers who keep calling and pushing stack loans, the BFS reps were highly professional. They went over contract summaries verbally and in writing to ensure we understood terms before signing."
    },
    {
      name: "Robert Gallagher",
      date: "February 7, 2026",
      rating: 5,
      title: "Challenged credit but still funded",
      body: "Our credit score was under 600 due to past tax lien history. BFS worked with their alternative direct lenders and secured a 10-year term loan for our retail business. Highly recommend!"
    },
    {
      name: "Elena Rostova",
      date: "February 2, 2026",
      rating: 5,
      title: "Great service and no advisory fees",
      body: "Biggs Funding Solutions made the process so easy. We downloaded our last 4 months of bank statements, uploaded them directly to their application portal, and locked in a commercial line of credit inside 2 days."
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-24 px-4 border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase border border-[#0ba5f9]/20">
            Client Testimonials
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Client <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Reviews & Feedback</span>
          </h1>
          <p className="text-base md:text-lg text-slate-350 max-w-xl mx-auto leading-relaxed">
            See what business owners say about their experience getting funded through Biggs Funding Solutions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl transition cursor-pointer">
                Get Funded Now
              </span>
            </Link>
            <Link href="/submit-a-review">
              <span className="inline-block px-6 py-3 bg-slate-900/60 border border-slate-800 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl transition cursor-pointer">
                Write a Review
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trustpilot Placeholder & Stats */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Trustscore Rating</h3>
            <p className="text-xs text-slate-400">Based on verified small business submissions</p>
          </div>
          <div className="flex items-center gap-2 text-2xl font-black text-white">
            <span>4.9</span>
            <div className="flex text-amber-400">
              {"★"}{"★"}{"★"}{"★"}{"★"}
            </div>
            <span className="text-xs font-semibold text-slate-400">(250+ reviews)</span>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleReviews.map((review, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0ba5f9]">{review.name}</span>
                  <span className="text-[10px] text-slate-500">{review.date}</span>
                </div>
                <div className="flex text-amber-400 text-sm">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <h4 className="text-sm font-bold text-white">{review.title}</h4>
                <p className="text-xs md:text-sm text-slate-350 leading-relaxed">
                  &ldquo;{review.body}&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-slate-800/40 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Verified Client
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
