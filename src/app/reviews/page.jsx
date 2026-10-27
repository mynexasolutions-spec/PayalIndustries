import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Customer Reviews",
  description:
    "See what homeowners and professionals say about working with Payal Industries for UPVC, aluminium and glass work in Hubli.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Reviews" path="/reviews" />
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
