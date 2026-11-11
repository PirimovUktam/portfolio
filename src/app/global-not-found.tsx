import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { bodyFont, displayFont } from "@/lib/fonts";
import { homePath } from "@/lib/routes";
import "./globals.css";

const copy = portfolio.ui.notFound;

export const metadata: Metadata = {
  title: `${copy.title.en} / ${copy.title.uz} — ${portfolio.profile.name}`,
  description: copy.description.en,
  icons: { icon: "/favicon.svg" },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <main className="shell not-found-page not-found-bilingual" id="main-content">
          <p className="eyebrow">404</p>
          <h1>
            {copy.title.en}{" "}
            <span lang="uz">{copy.title.uz}</span>
          </h1>
          <div className="not-found-options">
            {(["en", "uz"] as const).map((locale) => (
              <div key={locale} lang={locale}>
                <p>{copy.description[locale]}</p>
                <a className="text-link" href={homePath(locale)} hrefLang={locale}>
                  {copy.backHome[locale]} <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
