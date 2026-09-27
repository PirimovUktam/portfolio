import Link from "next/link";
import { Asterisk, BriefcaseBusiness, UserRound, Layers3, ArrowUpRight } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";
import { MobileMenu } from "./mobile-menu";

const navigationIcons = [BriefcaseBusiness, UserRound, Layers3, ArrowUpRight];

export function SiteHeader({ locale, slug }: { locale: Locale; slug?: string }) {
  const links = portfolio.nav.map(({ id, label }) => ({
    href: `${homePath(locale)}#${id}`,
    label: label[locale],
  }));
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href={homePath(locale)} className="brand" aria-label={portfolio.profile.name}>
          <Asterisk size={30} strokeWidth={1.5} aria-hidden="true" />
          <span>{portfolio.profile.name}</span>
        </Link>
        <nav className="desktop-nav" aria-label={portfolio.ui.menu[locale]}>
          {links.map((link, index) => {
            const Icon = navigationIcons[index % navigationIcons.length];
            return <a key={link.href} href={link.href}><Icon size={19} aria-hidden="true" />{link.label}</a>;
          })}
        </nav>
        <div className="header-actions">
          <nav className="language-switch" aria-label={portfolio.ui.languageLabel[locale]}>
            {(["en", "uz"] as const).map((language) => language === locale ? (
              <span key={language} lang={language} aria-current="page">{language.toUpperCase()}</span>
            ) : (
              <Link key={language} lang={language} hrefLang={language} href={slug ? projectPath(language, slug) : homePath(language)}>
                {language.toUpperCase()}
              </Link>
            ))}
          </nav>
          <MobileMenu links={links} openLabel={portfolio.ui.menu[locale]} closeLabel={portfolio.ui.closeMenu[locale]} />
        </div>
      </div>
    </header>
  );
}
