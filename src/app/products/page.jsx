import PageHero from "@/components/PageHero";
import ProductsCatalog from "@/components/ProductsCatalog";
import MaterialCompare from "@/components/MaterialCompare";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Products | Payal Industries",
  description:
    "UPVC sliding windows, aluminium sliding & casement windows, profile doors, bi-fold doors and glass partitions from Payal Industries, Hubli.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumb="Products"
        eyebrow="Our Products"
        title="Windows, doors & glass,"
        highlight="made to measure"
        subtitle="UPVC and aluminium systems, profile doors and all types of glass work, fabricated in Hubballi for projects across Karnataka."
        image="/work-aluminium-window/03.jpg"
      />
      <ProductsCatalog />
      <MaterialCompare />
      <CtaBanner />
    </>
  );
}
