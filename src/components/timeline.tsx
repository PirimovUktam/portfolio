"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

export function Timeline({ locale }: { locale: Locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { sections: { journey }, timeline, process, ui } = portfolio;
  const active = timeline[activeIndex] ?? timeline[0];

  return (
    <section aria-labelledby="journey-title" className="journey-section" id="journey">
      <div className="shell">
        <Reveal delay={0.05}>
          <div className="section-intro journey-intro">
            <div>
              <p className="eyebrow section-index">{journey.label[locale]}</p>
              <h2 className="section-title" id="journey-title">{journey.title[locale]}</h2>
            </div>
            <p>{journey.intro[locale]}</p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div
            className="timeline-tabs"
            role="tablist"
            aria-label={journey.title[locale]}
          >
            {timeline.map((item, index) => {
              const isSelected = index === activeIndex;
              return (
                <button
                  aria-controls={`timeline-panel-${item.id}`}
                  aria-selected={isSelected}
                  className={isSelected ? "timeline-tab timeline-tab--active" : "timeline-tab"}
                  id={`timeline-tab-${item.id}`}
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  type="button"
                >
                  <span className="timeline-tab-code">{item.code}</span>
                  <span className="timeline-tab-title">{item.shortTitle[locale]}</span>
                  <span className="timeline-tab-badge">{item.badge[locale]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="timeline-stage">
          <AnimatePresence mode="wait">
            <motion.article
              aria-labelledby={`timeline-tab-${active.id}`}
              className="timeline-card"
              id={`timeline-panel-${active.id}`}
              initial={{ opacity: 0, y: 18, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.99 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              key={active.id}
              role="tabpanel"
            >
              <div className="timeline-card-head">
                <div>
                  <span className="timeline-pill">
                    <Layers aria-hidden="true" size={14} />
                    {active.code} / {active.badge[locale]}
                  </span>
                  <h3>{active.title[locale]}</h3>
                  <p className="timeline-subtitle">{active.subtitle[locale]}</p>
                </div>
                <span className="timeline-watermark" aria-hidden="true">{active.code}</span>
              </div>

              <p className="timeline-description">{active.description[locale]}</p>

              <ul className="timeline-highlights">
                {active.highlights.map((item) => (
                  <li key={item.en}>
                    <CheckCircle2 aria-hidden="true" className="timeline-check" size={18} />
                    <span>{item[locale]}</span>
                  </li>
                ))}
              </ul>

              <div className="timeline-stack-row">
                <span className="eyebrow timeline-stack-label">{ui.appliedStack[locale]}:</span>
                <div className="timeline-stack-chips">
                  {active.stack.map((tech) => (
                    <span className="tech-chip" key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="process-block">
          <Reveal delay={0.08}>
            <p className="eyebrow process-heading">{ui.processHeading[locale]}</p>
          </Reveal>
          <div className="process-grid">
            {process.map((step, index) => (
              <Reveal
                as="article"
                className="process-card"
                delay={0.1 + index * 0.08}
                key={step.step}
                y={18}
              >
                <div className="process-card-top">
                  <span className="process-step-num">{step.step}</span>
                  {index < process.length - 1 && (
                    <ArrowRight aria-hidden="true" className="process-arrow" size={16} />
                  )}
                </div>
                <p className="eyebrow process-subtitle">{step.subtitle[locale]}</p>
                <h3 className="process-title">{step.title[locale]}</h3>
                <p className="process-detail">{step.detail[locale]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

