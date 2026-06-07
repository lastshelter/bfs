"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer(): React.JSX.Element {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/portal")) {
    return <></>;
  }
  return (
    <footer className="bg-[#020b24] text-slate-300 py-16 px-6 border-t border-slate-800 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          
          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[17px] font-bold text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-[13px] font-medium">
              <li>
                <Link href="/business-line-of-credit" className="hover:text-white transition-smooth">
                  Additional Funding
                </Link>
              </li>
              <li>
                <Link href="/equipment-loans-and-leasing" className="hover:text-white transition-smooth">
                  Equipment Financing
                </Link>
              </li>
              <li>
                <Link href="/sba-loans" className="hover:text-white transition-smooth">
                  SBA Loans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-[17px] font-bold text-white tracking-wide">Company</h3>
              <ul className="space-y-3 text-[13px] font-medium">
                <li>
                  <Link href="/about-us" className="hover:text-white transition-smooth">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="text-[#0ba5f9] hover:text-white transition-smooth">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-smooth">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Trustpilot Review */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-slate-400">Please click here to leave a review</h4>
              <a
                href="https://www.trustpilot.com/review/biggsfundingsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white text-slate-900 px-3 py-1.5 rounded shadow-sm hover:opacity-90 transition-smooth"
              >
                <span className="text-[11px] font-bold text-slate-800">Review us on</span>
                <span className="text-[12px] font-extrabold text-[#00b67a] flex items-center gap-0.5">
                  <span className="text-[#00b67a]">★</span> Trustpilot
                </span>
              </a>
            </div>

            {/* BBB Accreditation */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-slate-400">Accredited By</h4>
              <div className="inline-flex items-center gap-2 bg-[#005fa7] text-white border border-[#004e8a] px-3 py-1.5 rounded shadow-sm">
                <span className="text-[16px] font-black tracking-tighter">BBB</span>
                <div className="text-[9px] leading-tight font-semibold border-l border-white/20 pl-2">
                  <div>ACCREDITED</div>
                  <div>BUSINESS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Compliance & HQ Address */}
          <div className="space-y-4 text-[13px] leading-relaxed font-medium">
            <div>
              <p className="text-slate-400 font-bold uppercase text-[11px] tracking-wider mb-0.5">Commercial Finance</p>
              <p className="font-bold text-white text-[14px]">Company NMLS ID: 2834712</p>
              <a
                href="https://www.nmlsconsumeraccess.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0ba5f9] hover:underline text-[12px]"
              >
                https://www.nmlsconsumeraccess.org
              </a>
            </div>

            <div className="pt-2">
              <p className="font-bold text-white text-[14px]">Biggs Funding Solutions Inc.</p>
              <p className="text-slate-300">20200 West Dixie Hwy. Suite 902</p>
              <p className="text-slate-300">Aventura, Florida</p>
              <p className="text-slate-300">33180</p>
            </div>
          </div>

          {/* Column 4: Join us On & Google Reviews */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-[17px] font-bold text-white tracking-wide">Join us On</h3>
              <p className="text-[12px] text-slate-400 leading-relaxed max-w-xs font-medium">
                We love who we are and we are very proud to be a part of your business
              </p>
              
              {/* Social Icons inside White Squares */}
              <div className="flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white flex items-center justify-center text-slate-800 hover:bg-slate-105 transition-smooth rounded-lg"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.5 0-4 1.5-4 4v2z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white flex items-center justify-center text-slate-800 hover:bg-slate-105 transition-smooth rounded-lg"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.689-.072 4.949 0 3.26.014 3.669.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.26 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.26-.014-3.669-.073-4.949-.2-4.357-2.617-6.78-6.979-6.98C15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white flex items-center justify-center text-slate-800 hover:bg-slate-105 transition-smooth rounded-lg"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Google Reviews Badge */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-slate-400">Please click here to leave a review</h4>
              <div className="bg-white text-slate-900 p-2.5 rounded shadow-sm inline-block min-w-[150px]">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[14px]">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">Reviews</span>
                </div>
                <div className="flex text-amber-500 text-xs mt-1">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
