import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import About from "@/components/About";
import Products from "@/components/Products";
import FeaturesBanner from "@/components/FeaturesBanner";
import Applications from "@/components/Applications";
import Gallery from "@/components/Gallery";
import ReelsShowcase from "@/components/ReelsShowcase";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import ContactTeaser from "@/components/ContactTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <About />
      <Products />
      <FeaturesBanner />
      <Applications />
      <Gallery preview />
      <ReelsShowcase />
      <WhyChoose />
      <Testimonials />
      <ContactTeaser />
    </>
  );
}
