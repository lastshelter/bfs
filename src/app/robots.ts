import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/portal", "/api/", "/admin"],
    },
    sitemap: "https://biggsfundingsolutions.com/sitemap.xml",
  };
}
