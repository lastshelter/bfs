import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqWidget from "@/components/FaqWidget";
import "./globals.css";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biggs Funding Solutions | Business Loans & Capital Funding Fort Lauderdale",
  description:
    "Get premium business loans, lines of credit, equipment financing, and merchant cash advances in Fort Lauderdale, Florida. Fast approval and flexible commercial capital.",
  keywords: [
    "business loans fort lauderdale",
    "commercial lending florida",
    "equipment leasing fort lauderdale",
    "merchant cash advance fl",
    "line of credit aventura",
    "capital funding florida"
  ],
  alternates: {
    canonical: "https://biggsfundingsolutions.com",
  },
  openGraph: {
    title: "Biggs Funding Solutions | Business Loans & Capital Funding Fort Lauderdale",
    description: "Get premium business loans, lines of credit, equipment financing, and merchant cash advances in Fort Lauderdale, Florida. Fast approval and flexible commercial capital.",
    url: "https://biggsfundingsolutions.com",
    type: "website",
    locale: "en_US",
    siteName: "Biggs Funding Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biggs Funding Solutions | Business Loans & Capital Funding Fort Lauderdale",
    description: "Get premium business loans, lines of credit, equipment financing, and merchant cash advances in Fort Lauderdale, Florida.",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#020b24] text-slate-100 min-h-screen flex flex-col justify-between font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Biggs Funding Solutions",
              "image": "https://biggsfundingsolutions.com/logo.png",
              "@id": "https://biggsfundingsolutions.com/#organization",
              "url": "https://biggsfundingsolutions.com",
              "telephone": "1-800-555-0199",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "20200 West Dixie Hwy. Suite 902",
                "addressLocality": "Aventura",
                "addressRegion": "FL",
                "postalCode": "33180",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.962057,
                "longitude": -80.144415
              },
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Fort Lauderdale"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Aventura"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Florida"
                }
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <FaqWidget />
      </body>
    </html>
  );
}
