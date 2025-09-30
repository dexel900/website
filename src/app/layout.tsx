import type { Metadata } from "next";
import { Open_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Script from "next/script";

export const metadata: Metadata = { title: "webbinich.agency" };

const sans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Outfit({ subsets: ["latin"], variable: "--font-display" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${sans.variable} ${display.variable} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
        {/* THREE + VANTA als Globals */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.globe.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
