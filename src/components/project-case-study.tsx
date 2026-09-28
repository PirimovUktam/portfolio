import { ArrowDown, ArrowRight } from "lucide-react";
import { portfolio, type Locale, type LocalizedText, type Project } from "@/data/portfolio";
import styles from "./project-case-study.module.css";

function SectionLabel({ number, label, locale }: { number: string; label: LocalizedText; locale: Locale }) {
  return <p className={styles.label}><span aria-hidden="true">{number}</span>{label[locale]}</p>;
}

export function ProjectCaseStudy({ project, locale }: { project: Project; locale: Locale }) {
  const study = project.caseStudy;
  if (!study) return null;

  const { ui } = portfolio;
  return (
    <div className={styles.caseStudy}>
      <div className={`container ${styles.opening}`} data-case-chapter>
        <section className={styles.problem} aria-labelledby="case-problem-heading" data-reveal>
          <SectionLabel number="01" label={ui.problem} locale={locale} />
          <h2 id="case-problem-heading">{study.problem.title[locale]}</h2>
          <p>{study.problem.description[locale]}</p>
          <div className={styles.audience}>
            <h3>{ui.audience[locale]}</h3>
            <p>{study.audience[locale]}</p>
          </div>
        </section>
        <section className={styles.solution} aria-labelledby="case-solution-heading" data-reveal>
          <SectionLabel number="02" label={ui.solution} locale={locale} />
          <h2 id="case-solution-heading">{study.solution.title[locale]}</h2>
          <p>{study.solution.description[locale]}</p>
        </section>
      </div>

      <section className={`container ${styles.role}`} aria-labelledby="case-role-heading" data-case-chapter data-reveal>
        <div>
          <SectionLabel number="03" label={ui.myRole} locale={locale} />
          <h2 id="case-role-heading">{project.role?.[locale] ?? ui.myContribution[locale]}</h2>
        </div>
        <div>
          <p>{study.roleSummary[locale]}</p>
          <ul className={styles.contributions}>
            {project.contributions.map((contribution) => <li key={contribution.en}><ArrowRight size={17} aria-hidden="true" />{contribution[locale]}</li>)}
          </ul>
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="case-architecture-heading" data-scroll-scene>
        <div className={`container ${styles.sectionInner}`}>
          <div className={styles.sectionIntro} data-reveal>
            <div>
              <SectionLabel number="04" label={ui.architecture} locale={locale} />
              <h2 id="case-architecture-heading">{study.architecture.title[locale]}</h2>
            </div>
            <p>{study.architecture.description[locale]}</p>
          </div>
          <figure className={styles.architectureDiagram} aria-labelledby="case-architecture-heading" data-reveal>
            <div className={styles.clients}>
              {study.architecture.clients.map((client) => <div className={styles.client} key={client.title.en}><h3>{client.title[locale]}</h3><p>{client.description[locale]}</p></div>)}
            </div>
            <div className={styles.connector} aria-hidden="true"><ArrowDown size={24} /></div>
            <div className={styles.platform}>
              <h3>{study.architecture.platform.title[locale]}</h3>
              <p>{study.architecture.platform.description[locale]}</p>
            </div>
            <div className={styles.connector} aria-hidden="true"><ArrowDown size={24} /></div>
            <div className={styles.services}>
              {study.architecture.services.map((service) => <div key={service.title.en}><h3>{service.title[locale]}</h3><p>{service.description[locale]}</p></div>)}
            </div>
            <figcaption className={styles.aiPrinciple}>
              <h3>{study.architecture.principle.title[locale]}</h3>
              <p>{study.architecture.principle.description[locale]}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={`container ${styles.learning}`} aria-labelledby="case-learning-heading" data-case-chapter>
        <div className={styles.sectionIntro} data-reveal>
          <div>
            <SectionLabel number="05" label={ui.howItWorks} locale={locale} />
            <h2 id="case-learning-heading">{study.learningLoop.title[locale]}</h2>
          </div>
          <p>{study.learningLoop.description[locale]}</p>
        </div>
        <ol className={styles.loop}>
          {study.learningLoop.phases.map((phase, index) => (
            <li className={styles.phase} key={phase.title.en} data-reveal>
              <span className={styles.phaseNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{phase.title[locale]}</h3>
              <ul className={styles.steps}>
                {phase.steps.map((step, stepIndex) => <li key={step.en}>{stepIndex > 0 && <ArrowDown size={15} aria-hidden="true" />}<span>{step[locale]}</span></li>)}
              </ul>
              <p>{phase.description[locale]}</p>
            </li>
          ))}
        </ol>
        <p className={styles.loopNote}>{study.learningLoop.note[locale]}</p>
      </section>

      <section className={`container ${styles.status}`} aria-labelledby="case-status-heading" data-case-chapter data-reveal>
        <div>
          <SectionLabel number="06" label={ui.currentStatus} locale={locale} />
          <h2 id="case-status-heading">{study.status.title[locale]}</h2>
        </div>
        <div>
          <p>{study.status.description[locale]}</p>
          <div className={styles.nextStep}><h3>{ui.nextStep[locale]}</h3><p>{study.nextStep[locale]}</p></div>
        </div>
      </section>
    </div>
  );
}
