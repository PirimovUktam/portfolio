# Öktam Pirimov — Portfolio

A bilingual portfolio for a mobile and full-stack engineer in Qarshi, Uzbekistan. Next.js statically exports the English and Uzbek homepages and project pages.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open [English](http://localhost:3000/) or [Uzbek](http://localhost:3000/uz/).

```sh
npm run lint
npm run typecheck
npm run build
```

The production build writes the static site to `out/` and checks the exported language routes, metadata and fallback page.

## Content and motion

Edit [portfolio.ts](src/data/portfolio.ts) for the profile, translations, skills, project summaries, links and image metadata. Add project screenshots under `public/images/projects/`. An image can list smaller WebP files in `variants` using their actual pixel widths. Featured projects appear in the gallery. The other projects appear in the index. Each project has an English and an Uzbek detail page.

CSS perspective gives the hero and project screenshots depth. Native scroll timelines animate those layers in supporting browsers. Pointer tilt applies to the hero on hover-capable devices. Reduced motion keeps the visual layout still.

The BilimYöl visuals come from the product’s demo assets. The LexHub cover shows its live mobile web interface. The Interlock hero artwork was generated with ImageGen.

## Production

The production export uses [pirimov.uz](https://pirimov.uz) for canonical URLs, Open Graph, the sitemap and robots.txt. Serve the contents of `out/` and configure the static host to return `404.html` with HTTP status 404 for missing paths.
