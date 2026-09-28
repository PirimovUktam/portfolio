import Image from "next/image";
import { portfolio } from "@/data/portfolio";

/** One continuous environment behind the accessible document. */
export function CinematicBackdrop() {
  const { desktop, mobile } = portfolio.background;
  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <picture className="cinematic-poster">
        <source media="(max-width: 800px)" srcSet={mobile.src} />
        <Image src={desktop.src} alt="" fill sizes="100vw" loading="eager" />
      </picture>
      <div className="cinematic-light" />
      <canvas className="cinematic-canvas" data-cinematic-canvas />
      <div className="cinematic-shade" />
    </div>
  );
}
