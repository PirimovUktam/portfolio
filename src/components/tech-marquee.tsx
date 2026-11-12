import { portfolio } from "@/data/portfolio";

export function TechMarquee() {
  const items = [...portfolio.marquee, ...portfolio.marquee];

  return (
    <div className="tech-marquee" aria-label="Technologies and engineering stack">
      <div className="tech-marquee-track">
        {items.map((tech, index) => (
          <span className="tech-marquee-item" key={`${tech}-${index}`}>
            <span className="tech-marquee-dot" aria-hidden="true" />
            <span>{tech}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

