import { ArrowDown, ArrowDownRight, ArrowUpRight, LocateFixed, Terminal } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { DepthScene } from "@/components/depth-scene";
import { ResponsiveImage } from "@/components/responsive-image";
import { TypewriterRole } from "@/components/typewriter-role";
import { Reveal } from "@/components/reveal";

export function Hero({ locale }: { locale: Locale }) {
  const { hero, profile } = portfolio;

  return (
    <section aria-labelledby="intro-title" className="shell hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <Reveal delay={0.04}>
            <p className="eyebrow hero-role">
              <TypewriterRole locale={locale} staticText={profile.role[locale]} />
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 id="intro-title">
              <span className="hero-word-line">{profile.givenName}</span>{" "}
              <span className="hero-accent-line">
                {profile.familyName}
                <span aria-hidden="true">.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <ul className="hero-disciplines" aria-label={locale === "uz" ? "Mutaxassislik yo'nalishlari" : "Core disciplines"}>
              {hero.disciplines.map((item) => (
                <li className="hero-discipline-chip" key={item.code}>
                  <span className="hero-discipline-code">{item.code}</span>
                  <span>{item.label[locale]}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="hero-intro">{profile.intro[locale]}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="hero-terminal" role="region" aria-label="Developer runtime terminal">
              <div className="hero-terminal-head">
                <div className="hero-terminal-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="hero-terminal-title">
                  <Terminal aria-hidden="true" size={12} /> {hero.terminalPrompt}
                </span>
                <span className="hero-terminal-status">READY</span>
              </div>
              <div className="hero-terminal-body">
                <span className="hero-terminal-sigil" aria-hidden="true">$</span>
                <TypewriterRole
                  locale={locale}
                  phrases={hero.terminalCommands[locale]}
                  staticText={hero.terminalCommands[locale][0]}
                  typingSpeed={38}
                  deletingSpeed={18}
                  pauseMs={2100}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="hero-actions">
              <a className="button button-accent" href="#work">
                {hero.action[locale]} <ArrowDownRight aria-hidden="true" size={19} />
              </a>
              <a className="button button-outline" href="#contact">
                {hero.secondaryAction[locale]} <ArrowUpRight aria-hidden="true" size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        <figure className="hero-figure">
          <DepthScene>
            <div className="scene-art">
              <ResponsiveImage
                className="hero-image"
                fetchPriority="high"
                fill
                image={hero.art}
                loading="eager"
                locale={locale}
                sizes="(max-width: 760px) 90vw, (max-width: 1440px) 45vw, 40rem"
              />
            </div>
            <div className="scene-rule" aria-hidden="true" />
            <div className="scene-origin" aria-hidden="true">
              <LocateFixed size={18} />
            </div>
          </DepthScene>
          <figcaption className="hero-caption eyebrow">
            <span>{hero.plate}</span>
            <span>{hero.index[locale]}</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-foot eyebrow">
        <span className="hero-location">
          <span aria-hidden="true" />
          {profile.location[locale]}
        </span>
        <a href="#work">
          {hero.next[locale]} <ArrowDown aria-hidden="true" size={15} />
        </a>
      </div>
    </section>
  );
}
