import Link from "next/link";
import { portfolio, type Locale } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";
import { ScrollProgress } from "@/components/scroll-progress";

const languages = [
  { code: "en", label: "English" },
  { code: "uz", label: "Özbekça" },
] as const;

export function SiteHeader({ locale, slug }: { locale: Locale; slug?: string }) {
  const { nav, profile, ui } = portfolio;
  const availabilityText = locale === "uz" ? "Hamkorlikka ochiq" : "Available for work";

  return (
    <header className="site-header">
      <ScrollProgress />
      <a className="skip-link" href="#main-content">{ui.skip[locale]}</a>
      <div className="shell header-inner">
        <Link className="brand" href={homePath(locale)}>
          <span className="brand-mark" aria-hidden="true">{profile.monogram}</span>
          <span className="brand-text">
            <span className="brand-name">{profile.name}</span>
            <span className="availability-badge" aria-label={availabilityText}>
              <span className="pulse-beacon" aria-hidden="true">
                <span className="pulse-beacon-ping" />
                <span className="pulse-beacon-dot" />
              </span>
              <span className="availability-label">{availabilityText}</span>
            </span>
          </span>
        </Link>
        <nav aria-label={ui.navigation[locale]} className="site-nav">
          {nav.map(({ id, label }) => (
            <a key={id} href={slug ? homePath(locale) + "#" + id : "#" + id}>
              {label[locale]}
            </a>
          ))}
        </nav>
        <div className="language-switch" role="group" aria-label={ui.languages[locale]}>
          {languages.map(({ code, label }) => (
            <Link
              aria-current={locale === code ? "page" : undefined}
              aria-label={code.toUpperCase() + " — " + label}
              className="language-link"
              href={slug ? projectPath(code, slug) : homePath(code)}
              hrefLang={code}
              key={code}
              lang={code}
            >
              {code.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
