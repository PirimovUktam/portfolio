import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function SocialLinks() {
  return (
    <ul className="social-links">
      {portfolio.socials.map(({ name, url }) => (
        <li key={url}>
          <a href={url}>{name} <ArrowUpRight aria-hidden="true" size={15} /></a>
        </li>
      ))}
    </ul>
  );
}
