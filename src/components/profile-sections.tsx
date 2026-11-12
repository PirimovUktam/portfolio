import { ResponsiveImage } from "@/components/responsive-image";
import { ArrowUpRight, Award } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

export function About({ locale }: { locale: Locale }) {
  const {
    experience,
    profile,
    sections: { about },
    skills,
  } = portfolio;

  return (
    <section aria-labelledby="about-title" className="shell about-section" id="about">
      <figure className="profile-portrait">
        <Reveal delay={0.08}>
          <div className="portrait-frame">
            <ResponsiveImage
              image={profile.image}
              locale={locale}
              sizes="(max-width: 355px) 88vw, (max-width: 760px) 20rem, (max-width: 1050px) 37vw, 26rem"
            />
          </div>
          <figcaption className="eyebrow">{profile.location[locale]}</figcaption>
        </Reveal>
      </figure>
      <div className="about-copy">
        <Reveal delay={0.08}>
          <div data-reveal="">
            <p className="eyebrow section-index">{about.label[locale]}</p>
            <h2 className="section-title" id="about-title">
              {about.title[locale]}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="about-bio">{profile.bio[locale]}</p>
        </Reveal>
        <dl className="skill-list">
          {skills.map(({ label, tools }, index) => (
            <Reveal as="div" key={label.en} delay={0.18 + index * 0.08}>
              <dt>{label[locale]}</dt>
              <dd className="skill-chips">
                {tools.map((tool) => (
                  <span className="skill-chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
        <ul className="experience-list">
          {experience.map(({ badge, period, title, detail, evidence }, index) => (
            <Reveal as="li" className="experience-card" key={title.en} delay={0.22 + index * 0.1}>
              <div>
                {(badge || period) && (
                  <div className="experience-head">
                    {badge && (
                      <span className="experience-badge">
                        <Award aria-hidden="true" size={13} /> {badge[locale]}
                      </span>
                    )}
                    {period && <span className="experience-period">{period[locale]}</span>}
                  </div>
                )}
                <h3>{title[locale]}</h3>
                <p>{detail[locale]}</p>
              </div>
              {evidence && (
                <a className="button button-outline experience-cert-btn" href={evidence.url} target="_blank" rel="noreferrer">
                  {evidence.label[locale]} <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
