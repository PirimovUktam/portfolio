import { portfolio, type Locale } from "@/data/portfolio";
import { SiteHeader } from "./site-header";
import { Hero } from "./hero";
import { SelectedWork } from "./selected-work";
import { ProfileSections } from "./profile-sections";
import { Contact } from "./contact";
import { ScrollMotion } from "./scroll-motion";

export function PortfolioPage({ locale }: { locale: Locale }) {
  return (
    <div id="top">
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">{portfolio.ui.skipToContent[locale]}</a>
      <SiteHeader locale={locale} />
      <main id="main">
        <Hero locale={locale} />
        <SelectedWork locale={locale} />
        <ProfileSections locale={locale} />
      </main>
      <Contact locale={locale} />
      <ScrollMotion />
    </div>
  );
}
