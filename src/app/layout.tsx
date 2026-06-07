import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import FundingSpecialists from "@/components/shared/FundingSpecialists";
import Footer from "@/components/shared/Footer";
import "./globals.css";

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
  title: "Biggs Funding Solutions | Premium Financial & Capital Funding",
  description:
    "Empowering businesses with custom capital solutions, invoice factoring, merchant cash advances, and lines of credit. Fast, transparent, and flexible funding.",
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
      <body className="bg-brand-dark text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <FundingSpecialists />
        <Footer />
      </body>
    </html>
  );
}

