"use client";

import Image from "next/image";
import { useState } from "react";
import type {
  Locale,
  PortfolioImage as PortfolioImageData,
} from "@/data/portfolio";

type PortfolioImageProps = {
  image: PortfolioImageData;
  locale: Locale;
  unavailableLabel: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function PortfolioImage({
  image,
  locale,
  unavailableLabel,
  className,
  priority = false,
  sizes = "100vw",
}: PortfolioImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const unavailable = !image.src.trim() || failedSource === image.src;

  return (
    <div
      className={["portfolio-image", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      {unavailable ? (
        <div
          className="portfolio-image__fallback"
          role="img"
          aria-label={`${image.alt[locale]}. ${unavailableLabel}`}
        >
          <span>{unavailableLabel}</span>
        </div>
      ) : (
        <Image
          className="portfolio-image__asset"
          src={image.src}
          alt={image.alt[locale]}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes={sizes}
          onError={() => setFailedSource(image.src)}
        />
      )}
    </div>
  );
}
