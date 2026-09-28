import { ArrowUp, ArrowUpRight, Asterisk } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { SocialLinks } from "./social-links";
import { MotionBackdrop } from "./motion-backdrop";

export function Contact({ locale }: { locale: Locale }) {
  const content = portfolio.sections.contact;
  return (
    <footer id="contact" className="dark-section contact-section" data-scroll-section data-motion-surface aria-labelledby="contact-heading">
      <MotionBackdrop />
      <div className="container">
        <div className="section-kicker"><span>{portfolio.recognitions.length ? "07" : "06"}</span><span>{content.eyebrow[locale]}</span></div>
        <div className="contact-grid" data-reveal>
          <h2 className="display contact-title" id="contact-heading">{content.heading[locale]}</h2>
          <div className="contact-aside"><Asterisk size={64} strokeWidth={1} aria-hidden="true" /><p>{content.intro[locale]}</p></div>
        </div>
        <div className="contact-links" data-reveal>
          <a className="email-link" href={`mailto:${portfolio.profile.email}`}><span>{portfolio.profile.email}</span><ArrowUpRight aria-hidden="true" /></a>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {portfolio.profile.name}</p>
          <p className="footer-note">{portfolio.footer.note[locale]}</p>
          <a href="#top">{portfolio.ui.backToTop[locale]}<ArrowUp size={14} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  );
}
