import type { Metadata } from "next";
import { portfolio, type Locale, type Project } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";

export function getSiteUrl(): URL {
  return new URL(portfolio.site.url);
}

export function productionPageUrl(path: string, siteUrl: URL): string {
  return new URL(path.endsWith("/") ? path : `${path}/`, siteUrl).href;
}

export function buildPageMetadata(locale: Locale, project?: Project): Metadata {
  const siteUrl = getSiteUrl();
  const title = project
    ? `${project.title} — ${portfolio.profile.name}`
    : portfolio.site.title[locale];
  const description = project
    ? project.summary[locale]
    : portfolio.site.description[locale];
  const route = project
    ? projectPath(locale, project.slug)
    : homePath(locale);
  const englishRoute = project ? projectPath("en", project.slug) : homePath("en");
  const uzbekRoute = project ? projectPath("uz", project.slug) : homePath("uz");
  const url = productionPageUrl(route, siteUrl);
  const socialImage = project?.cover?.image ?? portfolio.site.socialImage;
  const images = [{
    url: new URL(socialImage.src, siteUrl).href,
    width: socialImage.width,
    height: socialImage.height,
    alt: socialImage.alt[locale],
  }];

  return {
    title,
    description,
    icons: { icon: { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" } },
    metadataBase: siteUrl,
    alternates: {
      canonical: url,
      languages: {
        en: productionPageUrl(englishRoute, siteUrl),
        uz: productionPageUrl(uzbekRoute, siteUrl),
        "x-default": productionPageUrl(englishRoute, siteUrl),
      },
    },
    openGraph: {
      title,
      description,
      siteName: portfolio.profile.name,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "en_US",
      alternateLocale: locale === "uz" ? "en_US" : "uz_UZ",
      url,
      images,
    },
    twitter: {
      card: socialImage.width / socialImage.height >= 1.5 ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}
