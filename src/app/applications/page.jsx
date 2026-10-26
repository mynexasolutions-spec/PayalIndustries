import PageHero from "@/components/PageHero";
import ApplicationsDetail from "@/components/ApplicationsDetail";
import ProcessSteps from "@/components/ProcessSteps";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Applications | Payal Industries",
  description:
    "UPVC and aluminium window, door and glass solutions for luxury homes, apartments, commercial buildings and renovation projects across Karnataka.",
};

export default function ApplicationsPage() {
  return (
    <>
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
