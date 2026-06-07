"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export default function FAQPage(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const faqData: FAQCategory[] = [
    {
      title: "Applying",
      items: [
        {
          question: "Can I handle my application process online if I'd like?",
          answer: "Yes, you can! We offer both a fully automated process or a more involved Concierge approach."
        },
        {
          question: "If I've had past credit problems, should I apply?",
          answer: "YES, BFS has been able to help many clients with a less than perfect credit history."
        },
        {
          question: "If I already have a business loan, and need more funding should I apply?",
          answer: "Yes, BFS offers many products that can help you no matter the current situation."
        },
        {
          question: "My business just started. Can I still I get approved for financing?",
          answer: "We are unable to help fund start-ups. However, if you have been open for at least three months and can provide official documentation of your sales history, you are a candidate and should not hesitate to apply. In fact, it will be a short and simple process."
        },
        {
          question: "Do I need to mail in signed hardcopies of the application and contract?",
          answer: "No. We happily accept all documentation sent to us by fax or e-mail to our secure server."
        },
        {
          question: "How much time after filling out an application does it take to get a decision?",
          answer: "BFS can get you approved and funded in as little as 24 hours. An average funding timeframe is 1 to 2 business days depending on the loan product."
        }
      ]
    },
    {
      title: "Fees & Rates",
      items: [
        {
          question: "Is there a fee to apply for business funding?",
          answer: "No, at BFS we do not charge fees to apply nor do we charge fees for any of our business funding programs."
        },
        {
          question: "Are there any closing costs?",
          answer: "Yes, there are fees that are charged by the lenders and banks associated with most of our loan products, but BFS doesn't charge any additional fees at all for helping you to secure the money."
        },
        {
          question: "If I want to pay early, is there a fee to close my account?",
          answer: "No, there are no prepayment penalties on any of our loan products. However, some loan products offer an early discount and some do not."
        },
        {
          question: "What are the typical rates?",
          answer: "BFS has over 10 different business funding programs, each with its own rate and term. Our representatives do their best to give the most aggressive offer when it comes to the cost of funding."
        }
      ]
    },
    {
      title: "Funding",
      items: [
        {
          question: "Will this financing report to my business or personal credit?",
          answer: "Most of the funding programs that we offer do not report the loan to either business or personal credit agencies."
        },
        {
          question: "Is there a pre-payment penalty if I want to pay my account off early?",
          answer: "No, there is not. BFS has many funding programs that offer a discount to pay off early, so YOU SAVE!"
        },
        {
          question: "If I already have a business loan, can I qualify for another?",
          answer: "A qualified BFS representative will review your account with you and place you into a program that will fit your scenario without overextending your business."
        },
        {
          question: "Is your financing personally guaranteed and do you require collateral?",
          answer: "We offer programs that do not have a personal guaranty nor collateral, and we also offer programs that do. These details will depend on the type of financing you are looking for and will be communicated to you by our funding experts, verbally and in writing."
        },
        {
          question: "What steps can I take to ensure I receive the funds as fast as possible?",
          answer: "To expedite approval and funding, we encourage you to submit all requested documentation within 1 (one) day of submitting the initial application."
        }
      ]
    },
    {
      title: "Payments",
      items: [
        {
          question: "What type of repayment options does BFS offer on business funding products?",
          answer: "BFS has repayment options that include daily, weekly, bi-weekly, and monthly."
        },
        {
          question: "How do I repay the funds?",
          answer: "Most funding products do an automatic ACH debit from your business bank account. If you have an MCA loan through your credit card processing, then they will collect a certain percentage of your daily transactions. It all depends on the loan product that you are funded with."
        }
      ]
    },
    {
      title: "Security & Privacy",
      items: [
        {
          question: "When I send my personal information to BFS does the company re-sell it?",
          answer: "No, BFS stores all information in a secure CRM which sits on a secure cloud. Nothing is saved to any local computers and no data is ever sold to any 3rd parties."
        },
        {
          question: "What happens with my information if I'm declined?",
          answer: "BFS shreds any printed information and securely disposes of all shredded documents."
        },
        {
          question: "Will any of my creditors be notified I've applied for business funding?",
          answer: "BFS doesn't directly alert any creditors that you're applying for business funding."
        },
        {
          question: "Is my email secure that I send to the company with my information?",
          answer: "YES, BFS has a top-notch cyber security policy along with the most sophisticated security software."
        }
      ]
    },
    {
      title: "About BFS",
      items: [
        {
          question: "Where is Biggs Funding Solutions located?",
          answer: "BFS is located in South Florida (Aventura / Fort Lauderdale). However, we service the entire U.S. and parts of Canada too!"
        },
        {
          question: "How long has BFS been in business?",
          answer: "BFS has been in business helping small business owners find the right funding products since 2016."
        }
      ]
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setOpenIndex(0); // Open first item in new category
  };

  const currentCategory = faqData[activeCategory] || { title: "", items: [] };

  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-24 px-4 border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase border border-[#0ba5f9]/20">
            Frequently Asked Questions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How Can We <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Help You?</span>
          </h1>
          <p className="text-base md:text-lg text-slate-355 max-w-2xl mx-auto leading-relaxed">
            Find immediate answers regarding application processing, terms, fees, repayment plans, and data security.
          </p>
        </div>
      </section>

      {/* FAQ Interaction Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Navigation Category Tabs */}
          <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
            <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest px-3 mb-4 block">
              Categories
            </h3>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-hide">
              {faqData.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategoryChange(idx)}
                  className={`flex-1 lg:flex-initial text-left px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
                    activeCategory === idx
                      ? "bg-[#0ba5f9]/10 text-[#0ba5f9] border border-[#0ba5f9]/30"
                      : "bg-slate-900/40 text-slate-400 hover:text-white border border-transparent hover:bg-slate-900/60"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Accordion Panel */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight px-1">
              {currentCategory.title} Questions
            </h3>

            <div className="space-y-4">
              {currentCategory.items.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => handleToggle(idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-white hover:text-[#0ba5f9] transition gap-4"
                    >
                      <span className="text-sm md:text-base">{item.question}</span>
                      <span className={`transform transition duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-60 border-t border-slate-800/50" : "max-h-0"
                      }`}
                    >
                      <div className="p-5 text-sm text-slate-300 leading-relaxed bg-slate-950/20">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Footnote */}
            <div className="mt-8 p-6 bg-slate-950/30 border border-slate-900 rounded-2xl text-center space-y-4">
              <p className="text-xs text-slate-400">
                Connection with BFS is fully secure. We do not share your information with unaffiliated third parties.
              </p>
              <div>
                <Link href="/apply">
                  <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer">
                    Apply Online Now
                  </span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
