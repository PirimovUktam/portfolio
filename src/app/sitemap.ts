import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { getSiteUrl, productionPageUrl } from "@/lib/metadata";
import { homePath, projectPath } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  return [undefined, ...portfolio.projects].flatMap((project) => {
    const englishRoute = project ? projectPath("en", project.slug) : homePath("en");
    const uzbekRoute = project ? projectPath("uz", project.slug) : homePath("uz");
    const languages = {
      en: productionPageUrl(englishRoute, siteUrl),
      uz: productionPageUrl(uzbekRoute, siteUrl),
      "x-default": productionPageUrl(englishRoute, siteUrl),
    };

    return [englishRoute, uzbekRoute].map((route) => ({
      url: productionPageUrl(route, siteUrl),
      alternates: { languages },
    }));
  });
}
