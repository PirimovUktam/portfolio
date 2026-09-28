import Image from "next/image";
import type { CSSProperties } from "react";
import { portfolio } from "@/data/portfolio";

/** The supplied photograph stays aligned with its moving light and camera layers. */
export function MotionBackdrop({ priority = false }: { priority?: boolean }) {
  const { desktop, mobile } = portfolio.background;

  return (
    <div
      className="motion-backdrop"
      aria-hidden="true"
      style={{ "--backdrop-ratio": desktop.width / desktop.height } as CSSProperties}
    >
      <div className="motion-backdrop__frame">
        <div className="motion-backdrop__camera">
          <picture>
            <source media="(max-width: 800px)" srcSet={mobile.src} />
            <Image
              className="motion-backdrop__image"
              src={desktop.src}
              alt=""
              fill
              sizes="100vw"
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
            />
          </picture>
          <svg
            className="motion-backdrop__light-path"
            viewBox="0 0 1672 941"
            preserveAspectRatio="none"
            fill="none"
            focusable="false"
          >
            <path
              className="motion-backdrop__light-trace"
              d="M158 197C480 341 833 402 1168 429C1418 449 1458 229 888 169"
              pathLength="1000"
            />
          </svg>
        </div>
        <div className="motion-backdrop__atmosphere" />
        <svg className="motion-backdrop__particles" viewBox="0 0 1200 800" fill="currentColor" focusable="false">
          <g><circle cx="160" cy="160" r="2" /><circle cx="970" cy="310" r="2.5" /><circle cx="720" cy="650" r="1.5" /></g>
          <g><circle cx="360" cy="590" r="1.5" /><circle cx="850" cy="110" r="2" /><circle cx="1120" cy="560" r="2" /></g>
        </svg>
        <div className="motion-backdrop__shade" />
      </div>
    </div>
  );
}
