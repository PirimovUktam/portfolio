import { ResponsiveImage } from "@/components/responsive-image";
import type { Locale, Project } from "@/data/portfolio";

export function ProjectVisual({
  cover,
  locale,
  detail = false,
}: {
  cover: NonNullable<Project["cover"]>;
  locale: Locale;
  detail?: boolean;
}) {
  const { tone, image, inset } = cover;
  const portrait = image.height > image.width;
  const landscapeSizes = detail
    ? "(max-width: 1150px) 75vw, 54rem"
    : "(max-width: 760px) 75vw, (max-width: 1440px) 40vw, 36rem";
  const portraitSizes = detail
    ? "(max-width: 760px) 40vw, 18rem"
    : "(max-width: 760px) 40vw, (max-width: 1440px) 15.6vw, 14rem";
  const insetSizes = detail
    ? "(max-width: 1150px) 20vw, 13.5rem"
    : "(max-width: 760px) 20vw, (max-width: 1440px) 11vw, 9rem";

  return (
    <figure className={"project-visual project-visual--" + tone} data-depth={detail ? undefined : ""}>
      <div className="project-surface">
        <div className={portrait ? "project-screen project-screen--portrait" : "project-screen"}>
          <ResponsiveImage
            image={image}
            locale={locale}
            sizes={portrait ? portraitSizes : landscapeSizes}
            loading={detail ? "eager" : undefined}
          />
        </div>
        {inset && (
          <div className="project-inset">
            <ResponsiveImage
              image={inset}
              locale={locale}
              sizes={insetSizes}
            />
          </div>
        )}
      </div>
    </figure>
  );
}
