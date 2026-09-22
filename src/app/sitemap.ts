import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/cases`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cases.map((c) => ({
      url: `${site.url}/cases/${c.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: c.tier === "editorial" ? 0.8 : 0.6,
    })),
  ];
}
