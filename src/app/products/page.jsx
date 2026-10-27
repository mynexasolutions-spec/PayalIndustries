import PageHero from "@/components/PageHero";
import ProductsCatalog from "@/components/ProductsCatalog";
import MaterialCompare from "@/components/MaterialCompare";
import CtaBanner from "@/components/CtaBanner";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata({
  title: "Products - UPVC & Aluminium Windows, Doors, Glass Partitions",
  description:
    "UPVC sliding windows, aluminium sliding & casement windows, profile doors, bi-fold doors and glass partitions from Payal Industries, Hubli.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Products" path="/products" />
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
