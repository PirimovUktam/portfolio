import { ArrowUpRight } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { ContentIcon } from "./content-icon";
import { MotionBackdrop } from "./motion-backdrop";

function ProfileHeading({
  section,
  number,
  locale,
}: {
  section: "expertise" | "services" | "journey";
  number: string;
  locale: Locale;
}) {
  const copy = portfolio.sections[section];

  return (
    <header className="profile-heading" data-reveal>
      <p className="profile-kicker">
        <span className="profile-section-number" aria-hidden="true">{number}</span>
        <span>{copy.eyebrow[locale]}</span>
      </p>
      <h2 id={`${section}-heading`}>{copy.heading[locale]}</h2>
      <p className="profile-heading-intro">{copy.intro[locale]}</p>
    </header>
  );
}

export function ProfileSections({ locale }: { locale: Locale }) {
  const sectionNumber = (number: number) => String(number + (portfolio.recognitions.length ? 1 : 0)).padStart(2, "0");
  return (
    <>
      <section
        id="about"
        className="profile-section profile-about"
        data-scroll-section
        data-motion-surface
        aria-labelledby="about-heading"
      >
        <MotionBackdrop />
        <div className="container profile-about-grid">
          <header className="profile-about-heading" data-reveal>
            <p className="profile-kicker">
              <span className="profile-section-number" aria-hidden="true">{sectionNumber(2)}</span>
              <span>{portfolio.sections.about.eyebrow[locale]}</span>
            </p>
            <h2 id="about-heading">{portfolio.about.statement[locale]}</h2>
            <p className="profile-location">
              <ContentIcon name="map" size={24} />
              <span>{portfolio.profile.location[locale]}</span>
            </p>
          </header>
          <div className="profile-about-story" data-reveal>
            <p className="profile-bio">{portfolio.profile.bio[locale]}</p>
            <ol className="profile-principles">
              {portfolio.about.principles.map((principle, index) => (
                <li key={principle.en}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{principle[locale]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="expertise"
        className="profile-section profile-expertise"
        data-scroll-section
        data-motion-surface
        aria-labelledby="expertise-heading"
      >
        <MotionBackdrop />
        <div className="container profile-expertise-layout">
          <ProfileHeading section="expertise" number={sectionNumber(3)} locale={locale} />
          <div className="profile-skills-list">
            {portfolio.skills.map((skill) => (
              <article className="profile-skill" key={skill.category.en} data-reveal>
                <div className="profile-skill-icon">
                  <ContentIcon name={skill.icon} size={40} />
                </div>
                <h3>{skill.category[locale]}</h3>
                <ul>
                  {skill.items.map((item) => (
                    <li key={typeof item === "string" ? item : item.en}>
                      {typeof item === "string" ? item : item[locale]}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="profile-section profile-services"
        data-scroll-section
        data-motion-surface
        aria-labelledby="services-heading"
      >
        <MotionBackdrop />
        <div className="container">
          <ProfileHeading section="services" number={sectionNumber(4)} locale={locale} />
          <ol className="profile-service-catalog">
            {portfolio.services.map((service, index) => (
              <li key={service.title.en} className="profile-service" data-reveal>
                <div className="profile-service-top">
                  <ContentIcon name={service.icon} size={52} />
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{service.title[locale]}</h3>
                <p>{service.description[locale]}</p>
                <a
                  href="#contact"
                  className="profile-service-link"
                  aria-label={`${portfolio.ui.contactLabel[locale]} — ${service.title[locale]}`}
                >
                  <span>{portfolio.ui.contactLabel[locale]}</span>
                  <ArrowUpRight aria-hidden="true" size={24} />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="journey"
        className="profile-section profile-journey"
        data-scroll-section
        data-motion-surface
        aria-labelledby="journey-heading"
      >
        <MotionBackdrop />
        <div className="container">
          <ProfileHeading section="journey" number={sectionNumber(5)} locale={locale} />
          <div className="profile-journey-track">
            {portfolio.journey.map((item) => (
              <article key={item.title.en} className="profile-journey-entry" data-reveal>
                <div className="profile-journey-marker">
                  <ContentIcon name={item.icon} size={36} />
                </div>
                <p className="profile-journey-label">{item.label[locale]}</p>
                <h3>{item.title[locale]}</h3>
                <p className="profile-journey-description">{item.description[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
