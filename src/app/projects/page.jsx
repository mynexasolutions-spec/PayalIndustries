import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Our Work | Payal Industries",
  description:
    "Browse real UPVC window, aluminium window, office partition, glazing and glass door projects completed by Payal Industries in Hubli and across Karnataka.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Our Work"
        title="Projects we're"
        highlight="proud of"
        subtitle="Browse UPVC, aluminium, partition and glazing work by category."
        image="/work-glazing/01.jpg"
      />
      <Gallery />
      <CtaBanner />
    </>
  );
}
