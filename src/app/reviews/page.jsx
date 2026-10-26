import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Reviews | Payal Industries",
  description:
    "See what homeowners and professionals say about working with Payal Industries for UPVC, aluminium and glass work in Hubli.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        crumb="Reviews"
        eyebrow="Client Reviews"
        title="Trusted by"
        highlight="our clients"
        subtitle="What homeowners, builders and architects say about working with Payal Industries."
        image="/work-glazing/03.jpg"
      />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
