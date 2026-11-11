import Image, { type ImageProps } from "next/image";
import type { Locale, PortfolioImage } from "@/data/portfolio";

type ResponsiveImageProps = Pick<ImageProps, "className" | "fetchPriority" | "fill" | "loading"> & {
  image: PortfolioImage;
  locale: Locale;
  sizes: string;
};

export function ResponsiveImage({ image, locale, sizes, fill, ...props }: ResponsiveImageProps) {
  const img = (
    <Image
      {...props}
      {...(fill ? { fill } : { width: image.width, height: image.height })}
      src={image.src}
      alt={image.alt[locale]}
    />
  );

  if (!image.variants?.length) return img;

  // A static host can serve these widths without an image optimization API.
  const srcSet = [...image.variants, image].map(({ src, width }) => `${src} ${width}w`).join(", ");

  return (
    <picture>
      <source sizes={sizes} srcSet={srcSet} />
      {img}
    </picture>
  );
}
