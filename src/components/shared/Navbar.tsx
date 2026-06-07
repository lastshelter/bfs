'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="font-bold text-[#004B87] tracking-tight text-lg md:text-xl leading-tight">
          BIGGS FUNDING SOLUTIONS
        </Link>

        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-6 text-slate-600 font-medium">
          <Link href="/business-line-of-credit" className="hover:text-blue-600 transition-colors">Line of Credit</Link>
          <Link href="/term-loans" className="hover:text-blue-600 transition-colors">Term Loans</Link>
          <Link href="/sba-loans" className="hover:text-blue-600 transition-colors">SBA Loans</Link>
          <Link href="/equipment-loans-and-leasing" className="hover:text-blue-600 transition-colors">Equipment Financing</Link>
          <Link href="/apply" className="px-5 py-2.5 bg-[#0ba5f9] text-white rounded-lg hover:bg-blue-600 transition-all">
            Apply Now
          </Link>
        </nav>

        {/* MOBILE INTERACTIVE HAMBURGER BUTTON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 focus:outline-none rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* DYNAMIC MOBILE DROPDOWN DRAWER */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl flex flex-col font-semibold text-slate-700">
          <Link onClick={() => setIsOpen(false)} href="/business-line-of-credit" className="py-2 border-b border-slate-100 text-base">Business Line of Credit</Link>
          <Link onClick={() => setIsOpen(false)} href="/term-loans" className="py-2 border-b border-slate-100 text-base">Business Term Loans</Link>
          <Link onClick={() => setIsOpen(false)} href="/sba-loans" className="py-2 border-b border-slate-100 text-base">SBA Loans</Link>
          <Link onClick={() => setIsOpen(false)} href="/equipment-loans-and-leasing" className="py-2 border-b border-slate-100 text-base">Equipment Financing</Link>
          <Link onClick={() => setIsOpen(false)} href="/apply" className="w-full text-center py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-md">
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
