"use client";

import React from "react";
import Link from "next/link";

export default function faqPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#06153b]/40 px-6 py-16 md:py-24">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0ba5f9]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e08b00]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase text-[#0ba5f9] font-bold tracking-widest bg-[#0ba5f9]/10 px-3 py-1 rounded-full">
            Commercial Finance
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            FAQ
          </h1>
          <p className="text-slate-350 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            Can I handle my application process online if I’d like?
          </p>
          <div className="pt-4">
            <Link
              href="/apply"
              className="inline-block bg-[#e08b00] hover:bg-[#d67d00] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-smooth shadow-lg shadow-[#e08b00]/15"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl w-full mx-auto px-6 py-16 space-y-12">
        {/* Paragraphs */}
        <div className="space-y-6">
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Yes, you can! We offer both a fully automated process or a more involved Concierge approach.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            If I’ve had past credit problems, should I apply?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            YES, BFS has been able to help many clients with a less than perfect credit history.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            If I already have a business loan, and need more funding should I apply?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Yes, BFS offers many products that can help you no matter the current situation.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            My business just started. Can I still I get approved for financing?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            We are unable to help fund start-ups. However, if you have been open for at least three months and can provide official documentation of your sales history, you are a candidate and should not hesitate to apply. In fact, it will be a short and simple process.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Do I need to mail in signed hardcopies of the application and contract?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No. We happily accept all documentation sent to us by fax or e-mail to our secure server.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            How much time after filling out an application does it take to get a decision?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS can get you approved and funds in as little as 24 hours, an average funding timeframe is 1 to 2 business days depending on the loan product.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Is there a fee to apply for business funding?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No, at BFS we do not charge fees to apply nor do we charge fees for any of our business funding programs.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Are there any closing costs?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Yes, there are fees that are charged by the lenders and banks associated with most of our loan products, but BFS doesn’t charge any additional fees at all for helping you to secure the money.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            If I want to pay early, is there a fee to close my account?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No there are no prepayment penalty on any of our loan products. However, some loan products offer an early discount and some do not.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            What are the typical rates?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS has over 10 different business funding programs, each with its own rate and term. Our representatives do their best to give the most aggressive offer when it comes to cost of funding.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Will this financing report to my business or personal credit?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Most of the funding programs that we offer do not report the loan the either business or personal credit agencies.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Is there a pre-payment penalty if I want to pay my account off early?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No there is not BFS has many funding programs that offer a discount to pay off early so YOU SAVE!
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            If I already have a business loan, can I qualify for another?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            A qualified BFS representative will review your account with you and place you into a program that will fit your scenario without overextending your business.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Is your financing personally guaranteed and do you require collateral?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            We offer programs that do not have a personal guaranty nor collateral, and we also offer programs that do. These details will depend on the type of financing you are looking for and will be communicated to you by our funding experts, verbally and in writing.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            What steps can I take to ensure I receive the funds as fast as possible?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            To expedite approval and funding, we encourage you to submit all requested documentation within 1 (one) day of submitting the initial application.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            What type of repayment options does BFS offer on business funding products?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS has repayment options that include daily, weekly, bi-weekly, and monthly.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            How do I repay the funds?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Most funding products do an automatic ACH debt from your business account, but if you have an MCA loan through your credit card processing than they will collect a certain percentage of your daily transactions. All depends on the loan product that you are funded with.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            When I send my personal information to UCS does the company re-sell it?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No, BFS stores all information in a secure CRM which sits on a secure cloud. Nothing is saved to any local computers and no data is ever sold to any 3rd parties.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            What happens with my information if I’m declined?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS shreds any printed information and securely disposes of all shredded documents.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Will any of my creditors be notified I’ve applied for business funding?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS doesn’t directly alert any creditors that you’re applying for business funding.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Is my email secure that I send to the company with my information?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            YES, BFS has a top notch cyber security policy along with the most sophisticated security software.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Will any of my creditors be notified I’ve applied for business funding?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            No. BFS does not alert anyone at all the you are applying for business funding
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Where is Biggs Funding Solutions located?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS is located in Fort Lauderdale, Florida. However, we service the entire U.S. and parts of Canada too!
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            How long has BFS been in business?
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            BFS has been in business helping small business owners find the right funding products since 2016.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            About Us Contact Us
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Get Pre-qualified in less than 48 hours and we will get you the best solution for your business.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Complete our Application and we will contact you with your options.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Your connection with BFS is secure. We do not share your information.
          </p>
        
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            This will close in 7 seconds
          </p>
        </div>

        {/* Headings */}
        

        {/* Lists & Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"></div>

        {/* Verification and Security Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-950/20 text-center space-y-4">
          <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
            Secured Connection & Fast Processing
          </h4>
          <p className="text-[11px] text-slate-400 max-w-lg mx-auto">
            All applications are processed securely using AES-256-GCM encryption. Pre-qualification outcomes are delivered within 24 to 48 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/apply"
              className="inline-block bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl text-[#0ba5f9] transition-smooth"
            >
              Get Pre-qualified
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
