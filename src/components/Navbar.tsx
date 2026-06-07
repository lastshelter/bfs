"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"loans" | "resources" | null>(null);
  const [mobileLoansOpen, setMobileLoansOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  if (pathname && pathname.startsWith("/portal")) {
    return <></>;
  }

  const closeAll = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (item: "Business Loans" | "About Us" | "Resources" | "Contact") => {
    if (item === "Business Loans") {
      return [
        "/business-line-of-credit",
        "/equipment-loans-and-leasing",
        "/commercial-real-estate-loans",
        "/merchant-cash-advance",
        "/asset-backed-loans",
        "/sba-loans",
        "/term-loans"
      ].includes(pathname);
    }
    if (item === "About Us") return pathname === "/about-us";
    if (item === "Resources") {
      return [
        "/faq",
        "/how-to-download-and-upload-bank-statements",
        "/reviews",
        "/submit-a-review",
        "/privacy-policy"
      ].includes(pathname);
    }
    if (item === "Contact") return pathname === "/contact-us";
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020b24]/90 border-b border-slate-800/80 backdrop-blur-md px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          {/* BRAND LOGO (Routs to home) */}
          <Link 
            href="/" 
            onClick={closeAll} 
            className="text-lg font-black tracking-tight text-white uppercase shrink-0 font-sans"
          >
            BIGGS FUNDING <span className="text-[#0ba5f9]">SOLUTIONS</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* ITEM 1: BUSINESS LOANS DROPDOWN */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown("loans")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                type="button"
                className={`text-xs font-bold flex items-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer ${
                  isActive("Business Loans") || activeDropdown === "loans" ? "text-[#0ba5f9]" : "text-slate-300 hover:text-white"
                }`}
              >
                Business Loans
                <svg 
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    activeDropdown === "loans" ? "rotate-180 text-[#0ba5f9]" : "text-slate-400"
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Box (Premium Dark Sapphire Glassmorphism) */}
              {activeDropdown === "loans" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[380px] bg-[#020b24]/95 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 ease-out z-50 space-y-4">
                  {[
                    { href: "/business-line-of-credit", title: "Business Line of Credit", desc: "Flexible revolving lines of credit" },
                    { href: "/equipment-loans-and-leasing", title: "Equipment Loans and Equipment Leasing", desc: "Acquire critical machinery & assets" },
                    { href: "/commercial-real-estate-loans", title: "Commercial Real Estate Loans Refi or Purchase", desc: "Acquisition, refinance & cash out" },
                    { href: "/merchant-cash-advance", title: "Merchant Cash Advance", desc: "Revenue-based short-term advance" },
                    { href: "/asset-backed-loans", title: "Asset Backed Loans", desc: "Collateralized business equipment financing" },
                    { href: "/sba-loans", title: "SBA Loans", desc: "Federal government-backed financing" },
                    { href: "/term-loans", title: "Business Term Loans", desc: "Predictable, fixed-rate capital" }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={closeAll} 
                      className="block group/item hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="block text-xs font-bold text-white group-hover/item:text-[#0ba5f9] transition">
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 leading-relaxed group-hover/item:text-slate-300 transition">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ITEM 2: ABOUT US */}
            <Link 
              href="/about-us"
              onClick={closeAll}
              className={`text-xs font-bold transition-colors uppercase tracking-wider ${
                isActive("About Us") ? "text-[#0ba5f9]" : "text-slate-300 hover:text-white"
              }`}
            >
              About Us
            </Link>

            {/* ITEM 3: RESOURCES DROPDOWN */}
            <div 
              className="relative py-6"
              onMouseEnter={() => setActiveDropdown("resources")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                type="button"
                className={`text-xs font-bold flex items-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer ${
                  isActive("Resources") || activeDropdown === "resources" ? "text-[#0ba5f9]" : "text-slate-300 hover:text-white"
                }`}
              >
                Resources
                <svg 
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    activeDropdown === "resources" ? "rotate-180 text-[#0ba5f9]" : "text-slate-400"
                  }`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Box (Premium Dark Sapphire Glassmorphism) */}
              {activeDropdown === "resources" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-[#020b24]/95 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 ease-out z-50 space-y-4">
                  {[
                    { href: "/how-to-download-and-upload-bank-statements", title: "Bank Statement Guide", desc: "Guide to submitting bank files" },
                    { href: "/reviews", title: "Reviews", desc: "Verified customer experiences" },
                    { href: "/submit-a-review", title: "Submit a Review", desc: "Share your own funding success" },
                    { href: "/faq", title: "FAQ Hub", desc: "Answers regarding limits & terms" },
                    { href: "/privacy-policy", title: "Privacy Policy", desc: "Data security and guidelines" }
                  ].map((item, idx) => (
                    <Link 
                      key={idx} 
                      href={item.href} 
                      onClick={closeAll} 
                      className="block group/item hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="block text-xs font-bold text-white group-hover/item:text-[#0ba5f9] transition">
                        {item.title}
                      </span>
                      <span className="block text-[10px] text-slate-400 mt-0.5 leading-relaxed group-hover/item:text-slate-300 transition">
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ITEM 4: CONTACT */}
            <Link 
              href="/contact-us"
              onClick={closeAll}
              className={`text-xs font-bold transition-colors uppercase tracking-wider ${
                isActive("Contact") ? "text-[#0ba5f9]" : "text-slate-300 hover:text-white"
              }`}
            >
              Contact
            </Link>

          </div>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link href="/apply">
              <span className="inline-block px-6 py-3 rounded-full font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs transition-all hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                Apply Now
              </span>
            </Link>
          </div>

          {/* 🍔 HAMBURGER ICON */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 relative z-50"
            >
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 📱 DROPDOWN FULL INTERACTIVE PANEL */}
        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#020b24]/95 border-b border-slate-800 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-155 max-h-[80vh] overflow-y-auto">
            <div className="px-4 pt-2 pb-6 space-y-3">
              
              {/* Business Loans Collapsible Section */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setMobileLoansOpen(!mobileLoansOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800/50"
                >
                  <span>Business Loans</span>
                  <svg 
                    className={`h-4 w-4 transform transition-transform ${mobileLoansOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileLoansOpen && (
                  <div className="pl-6 space-y-1 bg-slate-950/20 rounded-xl py-1">
                    <Link href="/business-line-of-credit" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Business Line of Credit</Link>
                    <Link href="/equipment-loans-and-leasing" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Equipment Loans and Equipment Leasing</Link>
                    <Link href="/commercial-real-estate-loans" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Commercial Real Estate Loans Refi or Purchase</Link>
                    <Link href="/merchant-cash-advance" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Merchant Cash Advance</Link>
                    <Link href="/asset-backed-loans" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Asset Backed Loans</Link>
                    <Link href="/sba-loans" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">SBA Loans</Link>
                    <Link href="/term-loans" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Business Term Loans</Link>
                  </div>
                )}
              </div>

              {/* About Us Direct Link */}
              <Link 
                href="/about-us" 
                onClick={closeAll} 
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800/50"
              >
                About Us
              </Link>

              {/* Resources Collapsible Section */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800/50"
                >
                  <span>Resources</span>
                  <svg 
                    className={`h-4 w-4 transform transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="pl-6 space-y-1 bg-slate-950/20 rounded-xl py-1">
                    <Link href="/how-to-download-and-upload-bank-statements" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Bank Statement Guide</Link>
                    <Link href="/reviews" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Reviews</Link>
                    <Link href="/submit-a-review" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Submit a Review</Link>
                    <Link href="/faq" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">FAQ Hub</Link>
                    <Link href="/privacy-policy" onClick={closeAll} className="block px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white">Privacy Policy</Link>
                  </div>
                )}
              </div>

              {/* Contact Direct Link */}
              <Link 
                href="/contact-us" 
                onClick={closeAll} 
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800/50"
              >
                Contact
              </Link>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-slate-800/60 mt-2 px-3">
                <Link href="/apply" onClick={closeAll} className="block">
                  <span className="block w-full py-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm shadow-lg shadow-orange-500/10 text-center cursor-pointer">
                    Apply Online Now
                  </span>
                </Link>
              </div>

            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-20 w-full bg-[#020b24]" />
    </>
  );
}
