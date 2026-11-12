import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Layers, ShieldCheck, Workflow } from "lucide-react";
import { portfolio, projects, type Locale, type Project } from "@/data/portfolio";
import { Contact } from "@/components/contact";
import { ProjectVisual } from "@/components/project-visual";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { homePath, projectPath } from "@/lib/routes";

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  const { ui } = portfolio;
  const next = projects[projects.findIndex(({ slug }) => slug === project.slug) + 1] ?? projects[0];
  const { caseStudy } = project;
  const { architecture } = caseStudy;

  return (
    <div id="top" data-motion="on">
      <SiteHeader locale={locale} slug={project.slug} />
      <main className="project-detail shell" id="main-content" tabIndex={-1}>
        <Reveal delay={0.04}>
          <Link className="text-link" href={homePath(locale) + "#work"}>
            <ArrowLeft aria-hidden="true" size={18} /> {ui.back[locale]}
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <header className="detail-intro">
            <p className="eyebrow section-index">{project.category[locale]}</p>
            <h1>{project.title}</h1>
            <p>{project.summary[locale]}</p>
            {(project.liveUrl || project.githubUrl) && (
              <div className="detail-actions">
                {project.liveUrl && (
                  <a className="button button-accent" href={project.liveUrl} rel="noreferrer" target="_blank">
                    {ui.demo[locale]} <ArrowUpRight aria-hidden="true" size={19} />
                  </a>
                )}
                {project.githubUrl && (
                  <a className="button button-outline" href={project.githubUrl} rel="noreferrer" target="_blank">
                    {ui.source[locale]} <ArrowUpRight aria-hidden="true" size={19} />
                  </a>
                )}
              </div>
            )}
          </header>
        </Reveal>

        {project.cover && (
          <Reveal delay={0.14}>
            <ProjectVisual cover={project.cover} locale={locale} detail />
          </Reveal>
        )}

        <div className="detail-facts">
          <Reveal as="section" aria-labelledby="detail-role" delay={0.16}>
            <h2 className="eyebrow" id="detail-role">
              {ui.role[locale]}
            </h2>
            <p className="detail-role-value">{project.role[locale]}</p>
          </Reveal>

          <Reveal as="section" aria-labelledby="detail-contributions" delay={0.2}>
            <h2 className="eyebrow" id="detail-contributions">
              {ui.contributions[locale]}
            </h2>
            <ul>
              {project.contributions.map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" aria-labelledby="detail-tech" delay={0.24}>
            <h2 className="eyebrow" id="detail-tech">
              {ui.tech[locale]}
            </h2>
            <div className="detail-tech-chips">
              {project.technologies.map((tech) => (
                <span className="detail-tech-chip" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Senior Case Study Deep Dive */}
        <section className="case-study-section" aria-label="Case study analysis">
          <div className="case-narrative-grid">
            <Reveal as="article" className="case-narrative-card" delay={0.1}>
              <p className="eyebrow case-card-label">{ui.problem[locale]}</p>
              <p className="case-narrative-body">{caseStudy.problem[locale]}</p>
            </Reveal>

            <Reveal as="article" className="case-narrative-card case-narrative-card--accent" delay={0.18}>
              <p className="eyebrow case-card-label">{ui.solution[locale]}</p>
              <p className="case-narrative-body">{caseStudy.solution[locale]}</p>
              <div className="case-audience-block">
                <p className="eyebrow">{ui.audience[locale]}</p>
                <p className="case-audience-text">{caseStudy.audience[locale]}</p>
              </div>
            </Reveal>
          </div>

          {/* 3-Tier System Architecture Diagram */}
          <Reveal as="div" className="case-arch-block" delay={0.22}>
            <div className="case-block-head">
              <div>
                <p className="eyebrow">
                  <Layers aria-hidden="true" size={14} /> {ui.architecture[locale]}
                </p>
                <p className="case-arch-summary">{architecture.summary[locale]}</p>
              </div>
              <span className="case-arch-tag">3-TIER SYSTEM TOPOLOGY</span>
            </div>

            <div className="case-arch-diagram">
              {/* Tier 1: Client Applications */}
              <div className="case-arch-node-wrap">
                <div className="case-arch-node">
                  <div className="case-arch-node-head">
                    <span className="case-arch-step">01</span>
                    <span className="case-arch-layer">{ui.clientLayer[locale]}</span>
                  </div>
                  <div className="case-arch-subnodes">
                    {architecture.clients.map((node) => (
                      <div className="case-arch-subnode" key={node.title.en}>
                        <h3>{node.title[locale]}</h3>
                        <p>{node.detail[locale]}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="case-arch-connector" aria-hidden="true">
                  <ArrowRight className="arch-arrow-desktop" size={20} />
                  <ArrowDown className="arch-arrow-mobile" size={20} />
                </div>
              </div>

              {/* Tier 2: Core Platform */}
              <div className="case-arch-node-wrap">
                <div className="case-arch-node case-arch-node--platform">
                  <div className="case-arch-node-head">
                    <span className="case-arch-step">02</span>
                    <span className="case-arch-layer">{ui.platformLayer[locale]}</span>
                  </div>
                  <div className="case-arch-subnodes">
                    <div className="case-arch-subnode">
                      <h3>{architecture.platform.title[locale]}</h3>
                      <p>{architecture.platform.detail[locale]}</p>
                    </div>
                  </div>
                </div>
                <div className="case-arch-connector" aria-hidden="true">
                  <ArrowRight className="arch-arrow-desktop" size={20} />
                  <ArrowDown className="arch-arrow-mobile" size={20} />
                </div>
              </div>

              {/* Tier 3: Data & AI Services */}
              <div className="case-arch-node-wrap">
                <div className="case-arch-node">
                  <div className="case-arch-node-head">
                    <span className="case-arch-step">03</span>
                    <span className="case-arch-layer">{ui.serviceLayer[locale]}</span>
                  </div>
                  <div className="case-arch-subnodes">
                    {architecture.services.map((node) => (
                      <div className="case-arch-subnode" key={node.title.en}>
                        <h3>{node.title[locale]}</h3>
                        <p>{node.detail[locale]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4-Step Execution Workflow */}
          <Reveal as="div" className="case-workflow-block" delay={0.26}>
            <div className="case-block-head">
              <p className="eyebrow">
                <Workflow aria-hidden="true" size={14} /> {ui.workflow[locale]}
              </p>
              <span className="case-arch-tag">
                <ShieldCheck aria-hidden="true" size={13} /> PRODUCTION VERIFIED
              </span>
            </div>

            <ol className="case-workflow-grid">
              {caseStudy.workflow.map((step) => (
                <li className="case-workflow-card" key={step.step}>
                  <span className="case-workflow-num">{step.step}</span>
                  <h3>{step.title[locale]}</h3>
                  <p>{step.detail[locale]}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {next && next.slug !== project.slug && (
          <Reveal delay={0.15}>
            <Link className="next-project" href={projectPath(locale, next.slug)}>
              <span>
                <span className="eyebrow">{ui.next[locale]}</span>
                <span>{next.title}</span>
              </span>
              <ArrowRight aria-hidden="true" size={29} />
            </Link>
          </Reveal>
        )}
      </main>
      <Contact locale={locale} />
    </div>
  );
}
