"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage(): React.JSX.Element {
  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("biggs_admin_username") || "";
    }
    return "";
  });
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [rememberMe, setRememberMe] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("biggs_admin_username");
    }
    return false;
  });
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (rememberMe) {
      localStorage.setItem("biggs_admin_username", email);
    } else {
      localStorage.removeItem("biggs_admin_username");
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res) {
        throw new Error("No response received from the authentication provider.");
      }

      if (res.error) {
        setError("Invalid corporate credentials. Please try again.");
      } else {
        const session = await getSession();
        let targetPath = "/portal";
        if (session?.user?.role === "ADMIN" || session?.user?.role === "UNDERWRITER") {
          targetPath = "/admin";
        }
        router.push(targetPath);
      }
    } catch (err) {
      console.error("NextAuth Client Misfire Exception:", err);
      setError(err instanceof Error ? err.message : "Authentication process failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-16 relative overflow-hidden selection:bg-blue-500/30">
      {/* Background Glowing Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#0ba5f9]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid-bg pointer-events-none opacity-40" />

      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative animate-card-entrance hover:border-slate-700/60 focus-within:border-[#0ba5f9]/30 transition-all duration-500 group tech-border-glow">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#0ba5f9]/0 via-[#0ba5f9]/0 to-[#0ba5f9]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {error && (
          <div className="text-xs text-rose-450 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3.5 py-2 mb-4 animate-shake-error font-semibold">
            {error}
          </div>
        )}

        <h1 className="font-display font-black text-2xl tracking-tight text-white mb-2 text-center leading-tight uppercase">
          Biggs Funding Solutions <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ba5f9] via-blue-400 to-[#e08b00] drop-shadow-[0_0_10px_rgba(11,165,249,0.25)]">
            Admin Panel
          </span>
        </h1>
        <p className="text-slate-400 text-xs mb-6 text-center">
          Access your secure funding tracker and documentation dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Username or Email Address
            </label>
            <input
              ref={emailInputRef}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-white placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#0ba5f9]/50 focus:border-[#0ba5f9]/50 shadow-[0_0_15px_rgba(11,165,249,0.02)] focus:shadow-[0_0_20px_rgba(11,165,249,0.08)] text-sm transition-all duration-300"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-[#e08b00] hover:underline transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full pl-4 pr-12 py-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-white placeholder-slate-655 focus:outline-none focus:ring-1 focus:ring-[#0ba5f9]/50 focus:border-[#0ba5f9]/50 shadow-[0_0_15px_rgba(11,165,249,0.02)] focus:shadow-[0_0_20px_rgba(11,165,249,0.08)] text-sm transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] py-0.5">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-800 bg-slate-950 text-[#0ba5f9] focus:ring-[#0ba5f9]/50 h-3.5 w-3.5 cursor-pointer accent-[#0ba5f9]"
              />
              <span>Remember my session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-bold rounded-xl text-white text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg active:scale-[0.98] mt-6 flex items-center justify-center gap-2 cursor-pointer ${
              loading
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                : "bg-[#0ba5f9] hover:bg-[#008ee3] hover:shadow-[#0ba5f9]/20"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Validating Credentials...
              </>
            ) : (
              "Authenticate Admin Session"
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-slate-400 text-xs">
            New applicant?{" "}
            <Link href="/register" className="text-[#e08b00] hover:underline font-semibold transition-colors">
              Create a funding account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
