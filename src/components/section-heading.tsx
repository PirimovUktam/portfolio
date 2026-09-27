import { portfolio, type Locale } from "@/data/portfolio";

type SectionKey = keyof typeof portfolio.sections;

export function SectionHeading({ section, number, locale }: { section: SectionKey; number: string; locale: Locale }) {
  const content = portfolio.sections[section];
  return (
    <div className="section-heading" data-reveal>
      <div className="section-kicker"><span>{number}</span><span>{content.eyebrow[locale]}</span></div>
      <div className="section-heading-row">
        <h2 id={`${section}-heading`} className="display section-title">{content.heading[locale]}</h2>
        <p>{content.intro[locale]}</p>
      </div>
    </div>
  );
}
