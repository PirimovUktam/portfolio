import { portfolio, type Locale } from "@/data/portfolio";
import { Reveal } from "@/components/reveal";

export function StatsDeck({ locale }: { locale: Locale }) {
  return (
    <section aria-label={locale === "uz" ? "Muhandislik ko‘rsatkichlari" : "Engineering pillars"} className="shell stats-deck-section">
      <div className="stats-deck-grid">
        {portfolio.stats.map((item, index) => (
          <Reveal
            as="article"
            className="stats-card"
            delay={0.08 + index * 0.08}
            key={item.value}
            y={20}
          >
            <div className="stats-card-top">
              <span className="stats-value">{item.value}</span>
              <span className="stats-index" aria-hidden="true">0{index + 1}</span>
            </div>
            <h2 className="stats-label">{item.label[locale]}</h2>
            <p className="stats-detail">{item.detail[locale]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

