import Link from "next/link";
import React from "react";

export default function RegisterPage(): React.JSX.Element {
  return (
    <main className="flex-1 flex justify-center items-center px-4 py-16">
      <div className="w-full max-w-md glass-panel p-8 rounded-xl shadow-2xl border border-brand-accent/20">
        <h1 className="font-display text-2xl font-bold text-white mb-2 text-center">
          Register Application
        </h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Open a new account to apply for and track capital funding.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Legal Business Name
            </label>
            <input
              type="text"
              id="company"
              placeholder="Acme Corporation LLC"
              required
              className="w-full px-4 py-2 bg-brand-dark/50 border border-brand-accent/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold text-sm transition-smooth"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Corporate Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              className="w-full px-4 py-2 bg-brand-dark/50 border border-brand-accent/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold text-sm transition-smooth"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 bg-brand-dark/50 border border-brand-accent/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold text-sm transition-smooth"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 font-semibold rounded-lg gold-gradient text-brand-dark text-sm transition-smooth hover:opacity-90 mt-2"
          >
            Create Funding Account
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-brand-accent/10 text-center">
          <p className="text-slate-400 text-xs">
            Already registered?{" "}
            <Link href="/login" className="text-brand-gold hover:underline">
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
