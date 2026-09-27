import type { Locale } from "@/data/portfolio";

export function homePath(locale: Locale): string {
  return locale === "uz" ? "/uz" : "/";
}

export function projectPath(locale: Locale, slug: string): string {
  return `${locale === "uz" ? "/uz" : ""}/projects/${slug}`;
}
