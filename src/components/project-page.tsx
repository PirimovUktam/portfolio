import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolio, projects, type Locale, type Project } from "@/data/portfolio";
import { Contact } from "@/components/contact";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { homePath, projectPath } from "@/lib/routes";

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  const { ui } = portfolio;
  const next = projects[projects.findIndex(({ slug }) => slug === project.slug) + 1] ?? projects[0];

  return (
    <div id="top">
      <SiteHeader locale={locale} slug={project.slug} />
      <main className="project-detail shell" id="main-content" tabIndex={-1}>
        <Link className="text-link" href={homePath(locale) + "#work"}>
          <ArrowLeft aria-hidden="true" size={18} /> {ui.back[locale]}
        </Link>
        <header className="detail-intro">
          <p className="eyebrow section-index">{project.category[locale]}</p>
          <h1>{project.title}</h1>
          <p>{project.summary[locale]}</p>
          {(project.liveUrl || project.githubUrl) && (
            <div className="detail-actions">
              {project.liveUrl && (
                <a className="button button-accent" href={project.liveUrl}>
                  {ui.demo[locale]} <ArrowUpRight aria-hidden="true" size={19} />
                </a>
              )}
              {project.githubUrl && (
                <a className="button button-outline" href={project.githubUrl}>
                  {ui.source[locale]} <ArrowUpRight aria-hidden="true" size={19} />
                </a>
              )}
            </div>
          )}
        </header>
        {project.cover && <ProjectVisual cover={project.cover} locale={locale} detail />}
        <div className="detail-facts">
          <section aria-labelledby="detail-role">
            <h2 className="eyebrow" id="detail-role">{ui.role[locale]}</h2>
            <p>{project.role[locale]}</p>
          </section>
          <section aria-labelledby="detail-contributions">
            <h2 className="eyebrow" id="detail-contributions">{ui.contributions[locale]}</h2>
            <ul>{project.contributions.map((item) => <li key={item.en}>{item[locale]}</li>)}</ul>
          </section>
          <section aria-labelledby="detail-tech">
            <h2 className="eyebrow" id="detail-tech">{ui.tech[locale]}</h2>
            <p>{project.technologies.join(" · ")}</p>
          </section>
        </div>
        {next && next.slug !== project.slug && (
          <Link className="next-project" href={projectPath(locale, next.slug)}>
            <span>
              <span className="eyebrow">{ui.next[locale]}</span>
              <span>{next.title}</span>
            </span>
            <ArrowRight aria-hidden="true" size={29} />
          </Link>
        )}
      </main>
      <Contact locale={locale} />
    </div>
  );
}
