import ContactHero from "@/components/ContactHero";
import ContactCards from "@/components/ContactCards";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact Us | Payal Industries",
  description:
    "Get in touch with Payal Industries, Hubli for UPVC windows, aluminium windows, profile doors and glass work enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactCards />
      <Contact />
    </>
  );
}
