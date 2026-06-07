"use client";

import React, { useState } from "react";

export default function ContactUsPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate submission to API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Biggs Funding Solutions</span>
          </h1>
          <p className="text-base md:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Have any questions? Fill out the form below or reach out to our office directly.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="md:col-span-5 space-y-8 px-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Corporate Headquarters
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              You may contact us by filling out the form at any time you need professional support or have any questions. You can also leave your comments or feedback.
            </p>

            <div className="space-y-6">
              {/* Phone Block */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0ba5f9]/10 rounded-lg text-[#0ba5f9]">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Call Us</h4>
                  <p className="text-base text-slate-200 font-medium mt-0.5">+1 954-636-4808</p>
                </div>
              </div>

              {/* Email Block */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Email Support</h4>
                  <p className="text-base text-slate-200 font-medium mt-0.5">michael.biggs@biggsfundingsolutions.com</p>
                </div>
              </div>

              {/* Office Location Block */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Corporate Office</h4>
                  <p className="text-base text-slate-200 mt-0.5 leading-relaxed font-medium">
                    Biggs Funding Solutions Inc.<br />
                    20200 W. Dixie Hwy Suite 902<br />
                    Aventura, Florida. 33180
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="md:col-span-7 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl relative mx-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
            
            {status === "success" ? (
              <div className="text-center py-12 space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto">
                  Thank you for reaching out. A funding consultant will review your message and respond within 24 business hours.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-sm font-semibold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-bold text-[#0ba5f9] tracking-wider uppercase pb-3 border-b border-slate-800">
                  Submit an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Full Name"
                      className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Underwriting question, partnership opportunity..."
                    className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition"
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your funding request or question..."
                    className="w-full bg-[#030d2a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#0ba5f9] focus:ring-1 focus:ring-[#0ba5f9]/30 transition resize-none"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-50"
                  >
                    {status === "submitting" ? "Transmitting..." : "Submit Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
