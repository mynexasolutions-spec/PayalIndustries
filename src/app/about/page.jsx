import PageHero from "@/components/PageHero";
import AboutFacts from "@/components/AboutFacts";
import AboutStory from "@/components/AboutStory";
import AboutServices from "@/components/AboutServices";
import WorkMosaic from "@/components/WorkMosaic";
import AboutValues from "@/components/AboutValues";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "About Us | Payal Industries",
  description:
    "Payal Industries is a trusted UPVC and aluminium fabrication company in Hubli, specializing in windows, profile doors and all types of glass work across Karnataka.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Payal Industries"
        title="Designing better spaces with"
        highlight="UPVC & Aluminium"
        subtitle="A Hubballi workshop building windows, doors and glass work for homes, offices and commercial projects across Karnataka."
        image="/work-glazing/01.jpg"
      />
      <AboutFacts />
      <AboutStory />
      <AboutServices />
      <WorkMosaic />
      <AboutValues />
      <CtaBanner />
    </>
  );
}
