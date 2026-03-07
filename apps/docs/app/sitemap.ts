import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.startingpointui.com";

  const docUrls = getAllDocSlugs().map((slug) => ({
    url: `${baseUrl}/docs/${slug.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...docUrls,
  ];
}
