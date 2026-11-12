import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolio, projects, type Locale } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { projectPath } from "@/lib/routes";
import { Reveal } from "@/components/reveal";

export function SelectedWork({ locale }: { locale: Locale }) {
  const {
    sections: { work },
    ui,
  } = portfolio;
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section aria-labelledby="work-title" className="work-section" id="work">
      <div className="shell">
        <Reveal delay={0.05}>
          <div className="section-intro" data-reveal="">
            <div>
              <p className="eyebrow section-index">{work.label[locale]}</p>
              <h2 className="section-title" id="work-title">
                {work.title[locale]}
              </h2>
            </div>
            <p>{work.intro[locale]}</p>
          </div>
        </Reveal>

        <div className="project-grid">
          {featured.map((project, index) => (
            <Reveal
              as="article"
              className="featured-project"
              key={project.slug}
              delay={index * 0.12}
            >
              {project.cover && <ProjectVisual cover={project.cover} locale={locale} />}
              <div className="project-copy">
                <div className="project-meta-row">
                  <span className="project-seq-badge">
                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <p className="eyebrow">{project.category[locale]}</p>
                </div>

                <h3>{project.title}</h3>
                <p className="project-role-tag">{project.role[locale]}</p>
                <p className="project-summary">{project.summary[locale]}</p>

                <ul className="project-highlights">
                  {project.contributions.slice(0, 2).map((item) => (
                    <li key={item.en}>{item[locale]}</li>
                  ))}
                </ul>

                <ul className="project-tech-chips" aria-label={ui.tech[locale]}>
                  {project.technologies.map((tech) => (
                    <li className="project-tech-chip" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="project-links-row">
                  <Link
                    aria-label={ui.viewProject[locale] + " — " + project.title}
                    className="button button-dark project-case-btn"
                    href={projectPath(locale, project.slug)}
                  >
                    {ui.viewProject[locale]} <ArrowUpRight aria-hidden="true" size={17} />
                  </Link>
                  {project.liveUrl && (
                    <a
                      className="text-link project-ext-link"
                      href={project.liveUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {ui.demo[locale]} <ArrowUpRight aria-hidden="true" size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <div className="project-index">
            <Reveal delay={0.1}>
              <h3 className="eyebrow">{ui.moreWork[locale]}</h3>
            </Reveal>
            <ul>
              {others.map((project, index) => {
                const seq = String(featured.length + index + 1).padStart(2, "0");
                return (
                  <Reveal as="li" key={project.slug} delay={index * 0.06}>
                    <Link className="index-link" href={projectPath(locale, project.slug)}>
                      <div className="index-main">
                        <span className="index-seq">{seq}</span>
                        <div>
                          <span className="index-title">{project.title}</span>
                          <span className="index-summary">{project.summary[locale]}</span>
                        </div>
                      </div>
                      <div className="index-tags">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span className="index-tech-pill" key={tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="index-category">{project.category[locale]}</span>
                      <ArrowUpRight aria-hidden="true" size={19} />
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
