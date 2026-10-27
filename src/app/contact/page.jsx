import ContactHero from "@/components/ContactHero";
import ContactCards from "@/components/ContactCards";
import Contact from "@/components/Contact";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Contact Us - Get a Free Quote in Hubballi",
  description:
    "Get in touch with Payal Industries, Hubli for UPVC windows, aluminium windows, profile doors and glass work enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Contact Us" path="/contact" />
      <ContactHero />
      <ContactCards />
      <Contact />
    </>
  );
}
