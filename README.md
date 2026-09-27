# Pirimov O'ktam — Portfolio

A bilingual developer portfolio built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 and Lucide icons. Syne and Manrope provide the display and body typography.

The site exports static HTML and assets. Its supplied background image uses native scroll-driven camera movement, perspective, zoom and SVG light paths.

## Local development

Install Node.js 24 and npm, then run:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validation and production build

```sh
npm run lint
npm run typecheck
npm run build
```

The production build creates the deployable static site in `out/`. No runtime application server or database is required.

## Content and images

- Edit `src/data/portfolio.ts` for profile details, navigation, skills, services, projects, contacts and English/Uzbek translations.
- Keep the portrait in `public/images/profile/`.
- Add project screenshots under `public/images/projects/` and reference them from the project data with dimensions and localized alt text.
- The supplied desktop and mobile background images live in `public/images/backgrounds/`.

## Routes

| Page | English | Uzbek |
| --- | --- | --- |
| Portfolio | `/` | `/uz` |
| Project | `/projects/[slug]` | `/uz/projects/[slug]` |

Locale selection uses URLs. Each locale has its own server-rendered document language and metadata.

## Deploy with GitHub and Vercel

Import the GitHub repository into Vercel using the Next.js preset:

- Build command: `npm run build`
- Install command: `npm ci`
- Output directory: framework default (`output: "export"` produces `out/`)
- Node.js: `24.x`

Once connected, repository pushes trigger deployments. Production URL metadata is derived from Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` at build time. An explicit `portfolio.site.url` takes precedence when a production domain is configured; local builds without either value omit absolute production URLs.
