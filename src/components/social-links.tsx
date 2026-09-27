import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-links ${className}`}>
      {portfolio.socials.map((social) => (
        <a key={social.name} href={social.url}>
          {social.name}<ArrowUpRight size={14} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
