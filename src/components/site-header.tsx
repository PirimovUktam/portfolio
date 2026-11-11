import Link from "next/link";
import { portfolio, type Locale } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";

const languages = [
  { code: "en", label: "English" },
  { code: "uz", label: "Özbekça" },
] as const;

export function SiteHeader({ locale, slug }: { locale: Locale; slug?: string }) {
  const { nav, profile, ui } = portfolio;

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">{ui.skip[locale]}</a>
      <div className="shell header-inner">
        <Link className="brand" href={homePath(locale)}>
          <span className="brand-mark" aria-hidden="true">{profile.monogram}</span>
          <span>{profile.name}</span>
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
