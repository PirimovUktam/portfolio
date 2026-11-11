import type { Locale } from "@/data/portfolio";
import { About } from "@/components/profile-sections";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";

export function PortfolioPage({ locale }: { locale: Locale }) {
  return (
    <div className="portfolio-home" id="top">
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <SelectedWork locale={locale} />
        <About locale={locale} />
      </main>
      <Contact locale={locale} />
    </div>
  );
}
