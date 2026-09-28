import type { Metadata } from "next";
import { portfolio, type Locale, type Project } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";

/** Canonicals must describe the production site, never a local or preview build. */
export function getSiteUrl(): URL | undefined {
  const candidates = [
    portfolio.site.url,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;

    try {
      const url = new URL(candidate);
      if (
        url.protocol === "https:" &&
        url.hostname.includes(".") &&
        !url.hostname.endsWith(".localhost") &&
        !url.hostname.endsWith(".local") &&
        !/^\d+(\.\d+){3}$/.test(url.hostname) &&
        !url.username &&
        !url.password &&
        !url.port
      ) {
        return new URL(url.origin);
      }
    } catch {
      // An unset or invalid deployment URL must not leak into generated metadata.
    }
  }

  return undefined;
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
  const url = siteUrl ? productionPageUrl(route, siteUrl) : undefined;
  const socialImage = project?.image ?? portfolio.site.socialImage ?? portfolio.profile.image;
  const images = siteUrl
    ? [{
        url: new URL(socialImage.src, siteUrl).href,
        width: socialImage.width,
        height: socialImage.height,
        alt: socialImage.alt[locale],
      }]
    : undefined;

  return {
    title,
    description,
    icons: { icon: { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" } },
    ...(siteUrl ? {
      metadataBase: siteUrl,
      alternates: {
        canonical: url,
        languages: {
          en: productionPageUrl(englishRoute, siteUrl),
          uz: productionPageUrl(uzbekRoute, siteUrl),
          "x-default": productionPageUrl(englishRoute, siteUrl),
        },
      },
    } : {}),
    openGraph: {
      title,
      description,
      siteName: portfolio.profile.name,
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : "en_US",
      alternateLocale: locale === "uz" ? "en_US" : "uz_UZ",
      ...(url ? { url } : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: socialImage.width / socialImage.height >= 1.5 ? "summary_large_image" : "summary",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
