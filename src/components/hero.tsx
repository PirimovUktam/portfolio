import type { CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Asterisk, MapPin } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { PortfolioImage } from "./portfolio-image";
import { ContentIcon } from "./content-icon";
import { MotionBackdrop } from "./motion-backdrop";

export function Hero({ locale }: { locale: Locale }) {
  const { profile, hero } = portfolio;
  return (
    <section className="hero-scene" data-scroll-scene data-motion-surface aria-labelledby="hero-heading">
      <div className="hero-stage" data-scroll-sticky>
        <MotionBackdrop priority />
        <div className="container hero">
          <div className="hero-topline">
            <p className="hero-name"><span className="status-mark" aria-hidden="true" />{profile.name}</p>
            <p className="hero-location"><MapPin size={20} aria-hidden="true" />{profile.location[locale]}</p>
          </div>
          <div className="hero-grid">
            <div className="hero-content">
              <p className="hero-role">{profile.role[locale]}</p>
              <h1 id="hero-heading" className="hero-title">
                {hero.disciplines.map((discipline, index) => (
                  <span className="hero-word" key={discipline.label.en} style={{ "--word-index": index } as CSSProperties}>
                    <ContentIcon name={discipline.icon} size={48} className="hero-word-icon" />
                    <span className="hero-word-mask"><span>{discipline.label[locale]}.</span></span>
                  </span>
                ))}
              </h1>
              <p className="hero-intro">{hero.intro[locale]}</p>
              <div className="hero-cta">
                <a className="button button-lime" href="#work">{hero.primaryAction[locale]}<ArrowUpRight size={24} aria-hidden="true" /></a>
                <a className="text-link" href="#contact">{hero.secondaryAction[locale]}<ArrowUpRight size={22} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hero-art" data-tilt>
              <div className="portrait-depth" aria-hidden="true" />
              <figure className="hero-portrait">
                <div className="portrait-crop">
                  <PortfolioImage image={profile.image} locale={locale} unavailableLabel={portfolio.ui.imageUnavailable[locale]} priority sizes="(max-width: 600px) 50vw, (max-width: 1000px) 40vw, 480px" />
                </div>
                <figcaption><span>{profile.name}</span><ArrowUpRight size={30} aria-hidden="true" /></figcaption>
              </figure>
              <Asterisk className="hero-symbol" size={138} strokeWidth={1.8} aria-hidden="true" />
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#work" className="scroll-cue"><span className="scroll-cue-icon"><ArrowDown size={26} aria-hidden="true" /></span><span>{hero.scrollHint[locale]}</span></a>
            <p className="hero-index"><span>01</span><span aria-hidden="true">—</span>{portfolio.sections.work.eyebrow[locale]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
