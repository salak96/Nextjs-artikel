import { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${url}`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${url}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${url}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${url}/terms`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${url}/policy`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  return staticPages;
}
