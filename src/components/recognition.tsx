import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { projectPath } from "@/lib/routes";
import { PortfolioImage } from "./portfolio-image";
import { SectionHeading } from "./section-heading";

export function Recognition({ locale }: { locale: Locale }) {
  if (!portfolio.recognitions.length) return null;

  return (
    <section id="recognition" className="section recognition-section" aria-labelledby="recognition-heading" data-scroll-section data-motion-surface>

      <div className="container">
        <SectionHeading section="recognition" number="02" locale={locale} />
        <div className="recognition-list">
          {portfolio.recognitions.map((item) => (
            <article key={item.id} className="recognition-entry" data-reveal>
              <div className="recognition-identity">
                <Award size={56} strokeWidth={1.5} aria-hidden="true" />
                <p className="eyebrow">{item.distinction[locale]}</p>
                <h3 className="display">{item.title[locale]}</h3>
              </div>
              <div className="recognition-story">
                <p>{item.description[locale]}</p>
                <div className="recognition-links">
                  {item.projectSlug && <Link className="text-link" href={projectPath(locale, item.projectSlug)}>{portfolio.ui.caseStudy[locale]}<ArrowUpRight size={22} aria-hidden="true" /></Link>}
                  {item.evidenceUrl && <a className="text-link" href={item.evidenceUrl}>{portfolio.ui.viewCertificate[locale]}<ArrowUpRight size={22} aria-hidden="true" /></a>}
                </div>
              </div>
              {item.image && <figure className="recognition-evidence"><PortfolioImage image={item.image} locale={locale} unavailableLabel={portfolio.ui.imageUnavailable[locale]} sizes="(max-width: 600px) calc(100vw - 36px), (max-width: 800px) 520px, 40vw" /><figcaption>{item.image.alt[locale]}</figcaption></figure>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
