import type { Locale } from "@/data/portfolio";
import { About } from "@/components/profile-sections";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { StatsDeck } from "@/components/stats-deck";
import { TechMarquee } from "@/components/tech-marquee";
import { Timeline } from "@/components/timeline";

export function PortfolioPage({ locale }: { locale: Locale }) {
  return (
    <div className="portfolio-home" id="top" data-motion="on">
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <StatsDeck locale={locale} />
        <TechMarquee />
        <SelectedWork locale={locale} />
        <Timeline locale={locale} />
        <About locale={locale} />
      </main>
      <Contact locale={locale} />
    </div>
  );
}
