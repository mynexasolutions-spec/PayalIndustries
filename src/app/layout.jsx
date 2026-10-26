import { Manrope } from "next/font/google";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Payal Industries | UPVC & Aluminium Windows, Doors, Glass Work - Hubli",
  description:
    "Payal Industries is a trusted UPVC and aluminium fabrication company in Hubli specializing in windows, profile doors and all types of glass work across Karnataka.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body id="top" className="min-h-full flex flex-col font-sans antialiased text-ink bg-white">
        <TopBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealProvider />
      </body>
    </html>
  );
}
