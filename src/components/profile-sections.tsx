import { ResponsiveImage } from "@/components/responsive-image";
import { ArrowUpRight } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";

export function About({ locale }: { locale: Locale }) {
  const { experience, profile, sections: { about }, skills } = portfolio;

  return (
    <section aria-labelledby="about-title" className="shell about-section" id="about">
      <figure className="profile-portrait">
        <ResponsiveImage
          image={profile.image}
          locale={locale}
          sizes="(max-width: 355px) 88vw, (max-width: 760px) 20rem, (max-width: 1050px) 37vw, 26rem"
        />
        <figcaption className="eyebrow">{profile.location[locale]}</figcaption>
      </figure>
      <div className="about-copy">
        <div data-reveal="">
          <p className="eyebrow section-index">{about.label[locale]}</p>
          <h2 className="section-title" id="about-title">{about.title[locale]}</h2>
        </div>
        <p className="about-bio">{profile.bio[locale]}</p>
        <dl className="skill-list">
          {skills.map(({ label, tools }) => (
            <div key={label.en}>
              <dt>{label[locale]}</dt>
              <dd>{tools.join(" · ")}</dd>
            </div>
          ))}
        </dl>
        <ul className="experience-list">
          {experience.map(({ title, detail, evidence }) => (
            <li key={title.en}>
              <h3>{title[locale]}</h3>
              <p>{detail[locale]}</p>
              {evidence && (
                <a className="text-link" href={evidence.url}>
                  {evidence.label[locale]} <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
