import { business, siteUrl } from "@/lib/business";

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}

export function BreadcrumbJsonLd({ name, path }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: business.name, item: siteUrl },
          { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
        ],
      }}
    />
  );
}
