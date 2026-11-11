import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolio, projects, type Locale } from "@/data/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { projectPath } from "@/lib/routes";

export function SelectedWork({ locale }: { locale: Locale }) {
  const { sections: { work }, ui } = portfolio;
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <section aria-labelledby="work-title" className="work-section" id="work">
      <div className="shell">
        <div className="section-intro" data-reveal="">
          <div>
            <p className="eyebrow section-index">{work.label[locale]}</p>
            <h2 className="section-title" id="work-title">{work.title[locale]}</h2>
          </div>
          <p>{work.intro[locale]}</p>
        </div>

        <div className="project-grid">
          {featured.map((project) => (
            <article className="featured-project" key={project.slug}>
              {project.cover && <ProjectVisual cover={project.cover} locale={locale} />}
              <div className="project-copy">
                <p className="eyebrow">{project.category[locale]}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary[locale]}</p>
                <Link
                  aria-label={ui.viewProject[locale] + " — " + project.title}
                  className="text-link"
                  href={projectPath(locale, project.slug)}
                >
                  {ui.viewProject[locale]} <ArrowUpRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {others.length > 0 && (
          <div className="project-index">
            <h3 className="eyebrow">{ui.moreWork[locale]}</h3>
            <ul>
              {others.map((project) => (
                <li key={project.slug}>
                  <Link className="index-link" href={projectPath(locale, project.slug)}>
                    <span className="index-title">{project.title}</span>
                    <span className="index-category">{project.category[locale]}</span>
                    <ArrowUpRight aria-hidden="true" size={19} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
