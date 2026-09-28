# Pirimov O'ktam — Portfolio

A bilingual developer portfolio built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 and Lucide icons. Syne and Manrope provide the display and body typography.

The site exports static HTML and assets. One native WebGL folded ribbon, the supplied hero photograph and foreground content form a continuous scroll-driven scene. Motion starts automatically on every route, with adaptive desktop scene holds that keep long content reachable on shorter windows.

A single on-demand animation frame controller handles scroll, chapter progress and pointer input. The renderer has no private loop: six draw calls run only when inputs change, with a one-million-pixel desktop budget and a 450,000-pixel mobile budget. It stops while idle or hidden. Reduced motion removes timed entrances, pointer tilt and trailing interpolation and reduces direct scroll movement. If WebGL is unavailable or loses its context, the supplied image remains the fallback. Content remains visible without JavaScript.

`src/components/scroll-motion.tsx` owns scroll geometry and scheduling; `src/lib/cinematic-renderer.ts` owns geometry, lighting and context recovery. Chapter boundaries are measured from content rather than fixed document heights.

Live site: [pirimov-portfolio.vercel.app](https://pirimov-portfolio.vercel.app) · [Uzbek](https://pirimov-portfolio.vercel.app/uz/)

## Local development

Install Node.js 24 and npm, then run:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

## Validation and production build

```sh
npm run lint
npm run typecheck
npm run build
```

The production build creates the deployable static site in `out/`. No runtime application server or database is required.

## Content and images

- Edit `src/data/portfolio.ts` for profile details, navigation, skills, services, projects, recognition, contacts and English/Uzbek translations.
- Projects can supply a typed `caseStudy` with problem, solution, role, architecture, learning loop and current status. BilimYo?l uses this optional server-rendered presentation.
- Keep the portrait in `public/images/profile/`.
- Add project screenshots under `public/images/projects/` and reference them from the project data with dimensions and localized alt text.
- The supplied desktop and mobile background images live in `public/images/backgrounds/`.
- Recognition entries accept an optional image and certificate link. Add these only after confirming the recipient and achievement; the layout also supports text-only entries.

## Routes

| Page | English | Uzbek |
| --- | --- | --- |
| Portfolio | `/` | `/uz` |
| Project | `/projects/[slug]` | `/uz/projects/[slug]` |

Locale selection uses URLs. Each locale has its own server-rendered document language and metadata.

## Deploy with GitHub and Vercel

The private [GitHub repository](https://github.com/PirimovUktam/portfolio) is connected to the `pirimov-portfolio` project on Vercel's free Hobby plan. Pushes to `main` deploy the production site automatically.

The project uses the Next.js preset:

- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: framework default (`output: "export"` produces `out/`)
- Node.js: `24.x`

Once connected, repository pushes trigger deployments. Production URL metadata is derived from Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` at build time. An explicit `portfolio.site.url` takes precedence when a production domain is configured; local builds without either value omit absolute production URLs.
