import { Manrope } from "next/font/google";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { business, mapsHref, seo, siteUrl } from "@/lib/business";
import { allProducts } from "@/lib/products";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteTitle = "Payal Industries | UPVC & Aluminium Windows, Doors, Glass Work - Hubli";
const siteDescription =
  "Payal Industries is a trusted UPVC and aluminium fabrication company in Hubli specializing in windows, profile doors and all types of glass work across Karnataka.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Payal Industries",
  },
  description: siteDescription,
  keywords: seo.keywords,
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: business.name,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern home with aluminium glass sliding doors by Payal Industries, Hubli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: true, address: true },
  // Set NEXT_PUBLIC_GSC_VERIFICATION to the Google Search Console HTML-tag token to verify ownership.
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

export const viewport = {
  themeColor: "#071b30",
};

const logoUrl = `${siteUrl}/logo-512.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${siteUrl}/#business`,
      name: business.name,
      alternateName: `${business.name} Hubballi`,
      description: siteDescription,
      url: siteUrl,
      image: [`${siteUrl}/og-image.jpg`, logoUrl],
      logo: { "@type": "ImageObject", url: logoUrl, width: 512, height: 512 },
      email: business.email,
      telephone: business.contacts.map((c) => `+91${c.phone}`),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address,
        addressLocality: "Hubballi",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.geo.lat,
        longitude: business.geo.lng,
      },
      hasMap: mapsHref,
      areaServed: seo.areaServed.map((name) => ({
        "@type": name === "Karnataka" ? "State" : "City",
        name,
      })),
      knowsAbout: [
        "UPVC windows",
        "Aluminium windows",
        "Profile doors",
        "Glass partitions",
        "Structural glazing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "UPVC, Aluminium & Glass Work",
        itemListElement: allProducts.map((p) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: p.name, description: p.desc },
        })),
      },
      sameAs: [business.facebook, business.instagram],
      taxID: business.gstin,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: business.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#business` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${manrope.variable}`}>
      <body id="top" className="min-h-full flex flex-col font-sans antialiased text-ink bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
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
