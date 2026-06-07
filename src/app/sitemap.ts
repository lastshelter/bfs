import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://biggsfundingsolutions.com";
  const routes = [
    "",
    "/about-us",
    "/contact-us",
    "/apply",
    "/faq",
    "/reviews",
    "/business-line-of-credit",
    "/equipment-loans-and-leasing",
    "/commercial-real-estate-loans",
    "/merchant-cash-advance",
    "/asset-backed-loans",
    "/sba-loans",
    "/term-loans",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
