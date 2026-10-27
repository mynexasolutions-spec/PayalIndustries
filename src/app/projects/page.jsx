import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Our Work - Window, Door & Glazing Projects in Karnataka",
  description:
    "Browse real UPVC window, aluminium window, office partition, glazing and glass door projects completed by Payal Industries in Hubli and across Karnataka.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Our Work" path="/projects" />
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
