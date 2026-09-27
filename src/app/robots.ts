import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
