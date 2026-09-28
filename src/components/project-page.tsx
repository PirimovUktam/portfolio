import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { portfolio, type Locale, type Project } from "@/data/portfolio";
import { homePath, projectPath } from "@/lib/routes";
import { SiteHeader } from "./site-header";
import { ProjectVisual } from "./project-visual";
import { ProjectLinks } from "./selected-work";
import { PortfolioImage } from "./portfolio-image";
import { Contact } from "./contact";
import { ScrollMotion } from "./scroll-motion";
import { MotionBackdrop } from "./motion-backdrop";

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  const index = portfolio.projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = portfolio.projects[(index + 1) % portfolio.projects.length];
  return (
    <div id="top">
      <a className="skip-link" href="#main">{portfolio.ui.skipToContent[locale]}</a>
      <SiteHeader locale={locale} slug={project.slug} />
      <main id="main" className="project-page" data-motion-surface>
        <MotionBackdrop priority />
        <section className="container project-hero" data-scroll-scene aria-labelledby="project-heading">
          <Link href={`${homePath(locale)}#work`} className="text-link project-back"><ArrowLeft size={16} aria-hidden="true" />{portfolio.ui.backToProjects[locale]}</Link>
          <div className="project-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category[locale]}</span></div>
          <h1 className="display project-page-title" id="project-heading">{project.title}</h1>
          <div className="project-lead"><p>{project.summary[locale]}</p><ProjectLinks project={project} locale={locale} /></div>
          <ProjectVisual project={project} locale={locale} priority />
        </section>
        <section className="container project-details" aria-labelledby="overview-heading">
          <div className="project-overview" data-reveal>
            <p className="eyebrow">{portfolio.ui.projectOverview[locale]}</p>
            <h2 id="overview-heading">{project.category[locale]}</h2>
            <p>{project.description[locale]}</p>
          </div>
          <div className="project-detail-aside">
            {project.role && <div data-reveal><h2 className="eyebrow">{portfolio.ui.myRole[locale]}</h2><p className="detail-contributions">{project.role[locale]}</p></div>}
            {project.contributions.length > 0 && <div data-reveal><h2 className="eyebrow">{portfolio.ui.myContribution[locale]}</h2><ul className="detail-contributions">{project.contributions.map((item) => <li key={item.en}>{item[locale]}</li>)}</ul></div>}
            {project.technologies.length > 0 && <div data-reveal><h2 className="eyebrow">{portfolio.ui.technologies[locale]}</h2><ul className="detail-tech">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>}
          </div>
        </section>
        {Boolean(project.screenshots?.length) && <div className="container project-gallery">{project.screenshots!.map((image) => <figure key={image.src} data-reveal><PortfolioImage image={image} locale={locale} unavailableLabel={portfolio.ui.imageUnavailable[locale]} /><figcaption>{image.alt[locale]}</figcaption></figure>)}</div>}
        {nextProject && nextProject.slug !== project.slug && <div className="container next-project" data-reveal><span className="eyebrow">{portfolio.ui.nextProject[locale]}</span><Link className="display" href={projectPath(locale, nextProject.slug)}>{nextProject.title}<ArrowUpRight aria-hidden="true" /></Link></div>}
      </main>
      <Contact locale={locale} />
      <ScrollMotion />
    </div>
  );
}
