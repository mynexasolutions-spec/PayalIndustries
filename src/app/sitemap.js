import { siteUrl } from "@/lib/business";
import { workCategories } from "@/lib/work-gallery";

const workImages = workCategories.flatMap((c) => c.items.map((i) => `${siteUrl}${i.src}`));

const routes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8, images: workImages },
  { path: "/applications", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/reviews", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map(({ path, ...rest }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    ...rest,
  }));
}
