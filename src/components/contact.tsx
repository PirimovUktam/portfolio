import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { homePath } from "@/lib/routes";
import { SocialIcon, SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";

export function Contact({ locale }: { locale: Locale }) {
  const {
    profile,
    sections: { contact },
    socials,
    ui,
  } = portfolio;

  return (
    <footer className="contact-section" id="contact">
      <div className="shell">
        <div className="contact-main">
          <Reveal delay={0.06}>
            <div>
              <p className="eyebrow">{contact.label[locale]}</p>
              <h2 className="section-title">{contact.title[locale]}</h2>
              <p>{contact.intro[locale]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="contact-cta-group">
              <a className="button button-dark" href={"mailto:" + profile.email}>
                <Mail aria-hidden="true" size={18} />
                <span>{profile.email}</span>
                <ArrowUpRight aria-hidden="true" size={19} />
              </a>
              <div className="contact-social-buttons">
                {socials.map(({ name, url }) => (
                  <a
                    className="button contact-social-btn"
                    href={url}
                    key={url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <SocialIcon name={name} size={18} />
                    <span>{name}</span>
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="contact-foot">
          <Link className="footer-name" href={homePath(locale)}>
            {profile.name}
          </Link>
          <SocialLinks />
          <a className="back-top" href="#top" aria-label={ui.backToTop[locale]}>
            <ArrowUp aria-hidden="true" size={21} />
          </a>
        </div>
      </div>
    </footer>
  );
}
