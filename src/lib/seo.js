import { business } from "@/lib/business";

// Page-level metadata. Next.js shallow-merges openGraph/twitter, so each page
// must restate them or it would inherit the homepage title in share previews.
export function pageMetadata({ title, description, path }) {
  const image = {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: `${business.name}, ${business.city}`,
  };
  const fullTitle = `${title} | ${business.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: business.name,
      title: fullTitle,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
