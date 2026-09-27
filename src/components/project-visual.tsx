import { ArrowRight } from "lucide-react";
import { portfolio, type Locale, type Project } from "@/data/portfolio";
import { ContentIcon } from "./content-icon";
import { PortfolioImage } from "./portfolio-image";

export function ProjectFlow({ project, locale }: { project: Project; locale: Locale }) {
  if (!project.visual.steps?.length) return null;
  return (
    <ol className="project-flow">
      {project.visual.steps.map((step, index) => (
        <li key={step.en}>
          <span className="flow-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="flow-label">{step[locale]}</span>
          {index < project.visual.steps!.length - 1 && <ArrowRight size={24} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export function ProjectVisual({ project, locale, priority = false }: { project: Project; locale: Locale; priority?: boolean }) {
  if (project.image) {
    return (
      <figure className="project-visual project-art project-art--image">
        <div className="project-art__canvas">
          <PortfolioImage image={project.image} locale={locale} unavailableLabel={portfolio.ui.imageUnavailable[locale]} priority={priority} sizes="(max-width: 959px) 100vw, 640px" />
        </div>
        <figcaption>{project.visual.caption[locale]}</figcaption>
      </figure>
    );
  }
  return (
    <figure className={"project-visual project-art project-art--" + project.icon}>
      <div className="project-art__canvas">
        <div className="project-art__sweep" aria-hidden="true" />
        <div className="project-art__hero" aria-hidden="true"><ContentIcon name={project.icon} size={190} strokeWidth={1.6} /></div>
        <div className="project-art__diagram">
          {project.visual.steps?.length ? <ProjectFlow project={project} locale={locale} /> : project.contributions.length > 0 ? (
            <div className="project-focus">
              <span className="project-focus__label">{portfolio.ui.focus[locale]}</span>
              <ol>{project.contributions.slice(0, 3).map((item, index) => <li key={item.en}><span>{String(index + 1).padStart(2, "0")}</span>{item[locale]}</li>)}</ol>
            </div>
          ) : null}
        </div>
      </div>
      <figcaption>{project.visual.caption[locale]}</figcaption>
    </figure>
  );
}
