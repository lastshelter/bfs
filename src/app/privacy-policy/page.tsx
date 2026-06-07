"use client";

import React from "react";

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="flex-1 flex flex-col bg-[#020b24] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#020b24] via-[#04123b] to-[#020b24] py-16 md:py-24 px-4 border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,165,249,0.08),transparent_50%)]" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold bg-[#0ba5f9]/10 text-[#0ba5f9] tracking-wide uppercase border border-[#0ba5f9]/20">
            Legal & Compliance
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Privacy <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0ba5f9] to-indigo-300">Statement</span>
          </h1>
          <p className="text-sm md:text-base text-slate-350 max-w-xl mx-auto leading-relaxed">
            We respect your privacy. Read our detailed information disclosure, storage, and customer opt-out practices below.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-2xl space-y-8 text-slate-305 text-sm md:text-base leading-relaxed">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              1. Scope & Acceptance
            </h2>
            <p>
              This privacy statement describes how Biggs International Inc. DBA (&ldquo;Biggs Funding Solutions&rdquo;) collects and uses the personal information you provide on our website: <span className="text-white font-semibold">biggsfundingsolutions.com</span>. It also describes the choices available to you regarding our use of your personal information and how you can access and update this information.
            </p>
            <p>
              If you do not agree to the terms of our Privacy Policy, please do not provide us with any information and do not use the site. By using the site and voluntarily providing your personally identifiable information to us, you consent to the collection and use of such personally identifiable information as set forth in the Privacy Policy in effect at the time of your submission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              2. Collection & Use of Personal Information
            </h2>
            <p>
              You can always visit our websites without informing us who you are or disclosing any information about yourself. We obtain personal information about you if you choose to provide it. This site allows you to contact us through our Contact Us form, Get Started forms, or via email. 
            </p>
            <p>
              Whether through the Contact Us form, Get Started forms, or sending an email using the email links contained in the web page, you may be providing us with your name, email address, phone number, and any information you choose to include in the text of your message. We also collect financial information such as bank account number, Social Security number, and Driver&apos;s License number.
            </p>
            <p>
              We collect, use, and keep the information we receive via our website to fulfill visitors&apos; requests. We use your information to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-slate-300">
              <li>Respond to requests submitted by you;</li>
              <li>Contact you and provide you with information regarding Sapphire Funding Group and our products;</li>
              <li>Correspond with you regarding the website;</li>
              <li>Comply with applicable laws, regulations, and requests of governmental agencies.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              3. Information Sharing & Opt-Out
            </h2>
            <p>
              We will share your personal information with third parties only in the ways that are described in this Privacy Policy. We will not sell, rent, or lease your personal information. We do not share personal information with unaffiliated third parties. We share your information with our affiliates in order to provide you with our services.
            </p>
            <p>
              We may provide your personal information to companies that provide services to help us with our business activities, such as obtaining credit reports from credit reporting bureaus or processing your transactions through financial institutions (including payment card processors and ACH processors). These companies are authorized to use your personal information only as necessary to provide these services to us.
            </p>
            <p>
              If you do not want us to share information with our affiliates for purposes of marketing products and services, you may opt-out of such information sharing by emailing <span className="text-[#0ba5f9] font-medium">info@biggsfundingsolutions.com</span>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              4. Tracking Technologies
            </h2>
            <p>
              As is true of most websites, we gather certain information automatically and store it in log files. This information may include Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), referring/exit pages, operating system, date/time stamp, and/or clickstream data. We may combine this automatically collected log information with other information we collect about you to improve marketing, analytics, or site functionality.
            </p>
            <p>
              Biggs Funding Solutions and its partners use cookies or similar technologies to analyze trends, administer the website, track users&apos; movements around the website, and gather demographic information. You can control the use of cookies at the individual browser level.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              5. Children&apos;s Privacy
            </h2>
            <p>
              Our sites are not designed and are not intended for children under the age of 13. Complying with the Children&apos;s Online Privacy Protection Act, our sites do not knowingly permit children less than 13 years of age to become users, and it is our policy never to knowingly collect information from children. By using any of our sites, you represent that you are not less than 13 years of age.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              6. Data Security & Integrity
            </h2>
            <p>
              The security of your personal information is important to us. When you enter sensitive information (such as bank account number and Social Security number) on our application forms, we encrypt the transmission of that information using Secure Socket Layer technology (SSL) and secure transport protocols.
            </p>
            <p>
              If you need to access, correct, amend, delete, or update inaccurate Personal Information, please send an email to <span className="text-[#0ba5f9] font-medium">info@biggsfundingsolutions.com</span>. We will respond promptly and will update our database accordingly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
              7. Contact Information
            </h2>
            <p>
              For questions or comments regarding our Privacy Policy, please contact: <span className="text-[#0ba5f9] font-medium">info@biggsfundingsolutions.com</span>. Biggs Funding Solutions may also be contacted directly at the following address:
            </p>
            <p className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl font-medium text-slate-300">
              Biggs International Inc. / Biggs Funding Solutions<br />
              20200 W. Dixie Hwy Suite 902<br />
              Aventura, Florida. 33180
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
