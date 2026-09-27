import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { portfolio, type Locale, type Project } from "@/data/portfolio";
import { projectPath } from "@/lib/routes";
import { ContentIcon } from "./content-icon";
import { ProjectVisual } from "./project-visual";
import { SectionHeading } from "./section-heading";
import { MotionBackdrop } from "./motion-backdrop";

export function ProjectLinks({ project, locale }: { project: Project; locale: Locale }) {
  if (!project.liveUrl && !project.githubUrl) return null;
  return (
    <div className="project-links">
      {project.liveUrl && <a href={project.liveUrl} className="text-link">{portfolio.ui.liveDemo[locale]}<ArrowUpRight size={22} aria-hidden="true" /></a>}
      {project.githubUrl && <a href={project.githubUrl} className="text-link">{portfolio.ui.sourceCode[locale]}<ArrowUpRight size={22} aria-hidden="true" /></a>}
    </div>
  );
}

function ProjectArticle({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const headingId = "project-" + project.slug + "-heading";
  return (
    <article className="project-scene" data-scroll-scene data-motion-surface data-project-surface={index % 3} aria-labelledby={headingId}>
      <div className="project-stage" data-scroll-sticky>
        <MotionBackdrop />
        <div className="container project-stage__inner">
          <div className="project-copy">
            <div className="project-meta">
              <span className="project-sequence">{String(index + 1).padStart(2, "0")}<span aria-hidden="true"> / </span>{String(portfolio.projects.length).padStart(2, "0")}</span>
              <span className="project-category"><ContentIcon name={project.icon} size={28} />{project.category[locale]}</span>
            </div>
            <h3 className="project-title" id={headingId}>
              <Link href={projectPath(locale, project.slug)}><span>{project.title}</span><ArrowUpRight aria-hidden="true" /></Link>
            </h3>
            <p className="project-summary">{project.summary[locale]}</p>
            {project.contributions.length > 0 && <ul className="project-contributions">{project.contributions.slice(0, 2).map((item) => <li key={item.en}>{item[locale]}</li>)}</ul>}
            {project.technologies.length > 0 && <p className="project-tech">{project.technologies.join(" / ")}</p>}
            <div className="project-bottom">
              <Link className="project-action" href={projectPath(locale, project.slug)}>{portfolio.ui.caseStudy[locale]}<ArrowUpRight size={26} aria-hidden="true" /></Link>
              <ProjectLinks project={project} locale={locale} />
            </div>
          </div>
          <ProjectVisual project={project} locale={locale} />
        </div>
      </div>
    </article>
  );
}

export function SelectedWork({ locale }: { locale: Locale }) {
  if (!portfolio.projects.length) return null;
  return (
    <section id="work" className="work-section dark-section" aria-labelledby="work-heading" data-scroll-section data-motion-surface>
      <MotionBackdrop />
      <div className="container work-heading"><SectionHeading section="work" number="01" locale={locale} /></div>
      <div className="projects-list">
        {portfolio.projects.map((project, index) => <ProjectArticle key={project.slug} project={project} index={index} locale={locale} />)}
      </div>
    </section>
  );
}
