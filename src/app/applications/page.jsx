import PageHero from "@/components/PageHero";
import ApplicationsDetail from "@/components/ApplicationsDetail";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Applications - Homes, Apartments & Commercial Glass Work",
  description:
    "UPVC and aluminium window, door and glass solutions for luxury homes, apartments, commercial buildings and renovation projects across Karnataka.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Applications" path="/applications" />
      <PageHero
        crumb="Applications"
        eyebrow="Applications"
        title="Solutions for"
        highlight="every kind of space"
        subtitle="Homes, apartments, offices and commercial buildings — we fit the right UPVC, aluminium and glass system to each."
        image="/work-glazing/03.jpg"
      />
      <ApplicationsDetail />
      <ProcessSteps />
      <CtaBanner />
    </>
  );
}
