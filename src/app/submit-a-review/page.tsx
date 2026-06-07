"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SubmitAReviewPage(): React.JSX.Element {
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [certified, setCertified] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!certified) {
      alert("Please certify that this review is based on your own experience.");
      return;
    }
    
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setTitle("");
      setReview("");
      setName("");
      setEmail("");
      setCertified(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-24 px-4 border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase border border-[#0ba5f9]/20">
            Share Your Experience
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Submit a <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">Review</span>
          </h1>
          <p className="text-sm md:text-base text-slate-355 max-w-xl mx-auto leading-relaxed">
            Your honest feedback helps us maintain our operational excellence and assists other merchants.
          </p>
        </div>
      </section>

      {/* Main content grid */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />

          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Review Submitted</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Thank you for your feedback! Your review has been saved and will be displayed after approval from our system.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Link href="/reviews">
                  <span className="inline-block px-6 py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-lg transition cursor-pointer">
                    Back to Reviews
                  </span>
                </Link>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-lg transition"
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-bold text-amber-500 tracking-wider uppercase pb-3 border-b border-slate-800">
                Write a Review
              </h3>

              {/* Overall Rating Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Your Overall Rating *
                </label>
                <div className="flex gap-2 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`transition-colors duration-150 ${
                        star <= rating ? "text-amber-400" : "text-slate-700 hover:text-slate-650"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Title of Review */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Title of Your Review *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience in a single phrase..."
                  className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                />
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Your Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share details of your experience working with Biggs Funding Solutions..."
                  className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                  />
                </div>
              </div>

              {/* Certification Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="certified"
                  required
                  checked={certified}
                  onChange={(e) => setCertified(e.target.checked)}
                  className="mt-1 h-4 w-4 bg-[#030d2a] border border-slate-800 rounded text-amber-500 focus:ring-amber-500/30 cursor-pointer"
                />
                <label htmlFor="certified" className="text-xs text-slate-400 select-none cursor-pointer leading-relaxed">
                  This review is based on my own experience and is my genuine opinion.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t border-slate-800/40">
                <Link href="/reviews">
                  <span className="px-5 py-2.5 bg-slate-805 hover:bg-slate-800 text-slate-350 font-semibold rounded-xl text-sm transition cursor-pointer">
                    Cancel
                  </span>
                </Link>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
                >
                  {status === "submitting" ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
