import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { homePath } from "@/lib/routes";
import { SocialLinks } from "@/components/social-links";

export function Contact({ locale }: { locale: Locale }) {
  const { profile, sections: { contact }, ui } = portfolio;

  return (
    <footer className="contact-section" id="contact">
      <div className="shell">
        <div className="contact-main">
          <div>
            <p className="eyebrow">{contact.label[locale]}</p>
            <h2 className="section-title">{contact.title[locale]}</h2>
            <p>{contact.intro[locale]}</p>
          </div>
          <a className="button button-dark" href={"mailto:" + profile.email}>
            {profile.email} <ArrowUpRight aria-hidden="true" size={20} />
          </a>
        </div>
        <div className="contact-foot">
          <Link className="footer-name" href={homePath(locale)}>{profile.name}</Link>
          <SocialLinks />
          <a className="back-top" href="#top" aria-label={ui.backToTop[locale]}>
            <ArrowUp aria-hidden="true" size={21} />
          </a>
        </div>
      </div>
    </footer>
  );
}
