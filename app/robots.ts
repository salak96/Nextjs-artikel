import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_WEB_URL || "https://ub.cafe";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/paneladmin/", "/api/", "/login", "/bookmarks", "/settings"],
      },
    ],
    sitemap: `${url}/sitemap.xml`,
  };
}
