import { ArrowDown, ArrowDownRight, LocateFixed } from "lucide-react";
import { portfolio, type Locale } from "@/data/portfolio";
import { DepthScene } from "@/components/depth-scene";
import { ResponsiveImage } from "@/components/responsive-image";

export function Hero({ locale }: { locale: Locale }) {
  const { hero, profile } = portfolio;

  return (
    <section aria-labelledby="intro-title" className="shell hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-role">{profile.role[locale]}</p>
          <h1 id="intro-title">
            {profile.givenName} <span>{profile.familyName}<span aria-hidden="true">.</span></span>
          </h1>
          <p className="hero-intro">{profile.intro[locale]}</p>
          <a className="button button-accent" href="#work">
            {hero.action[locale]} <ArrowDownRight aria-hidden="true" size={19} />
          </a>
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
            <div className="scene-origin" aria-hidden="true"><LocateFixed size={18} /></div>
          </DepthScene>
          <figcaption className="hero-caption eyebrow">
            <span>{hero.plate}</span>
            <span>{hero.index[locale]}</span>
          </figcaption>
        </figure>
      </div>
      <div className="hero-foot eyebrow">
        <span className="hero-location"><span aria-hidden="true" />{profile.location[locale]}</span>
        <a href="#work">{hero.next[locale]} <ArrowDown aria-hidden="true" size={15} /></a>
      </div>
    </section>
  );
}
