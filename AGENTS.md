# Portfolio Engineering Rules

## Mission

Build this portfolio as a production-quality personal brand website, not as a generic AI-generated template.

Priorities:

1. Strong visual hierarchy
2. Excellent UX
3. Clean architecture
4. Maintainable code
5. Performance
6. Accessibility
7. SEO
8. Visual polish

Working > Beautiful > Scalable > Optimized > Perfect.

---

## Engineering Style

Use the simplest architecture that solves the problem.

Prefer:

* Next.js App Router
* TypeScript
* Tailwind CSS
* Server Components by default
* small reusable components
* data-driven content
* semantic HTML

Avoid:

* unnecessary abstractions
* unnecessary state
* unnecessary Context
* unnecessary hooks
* unnecessary API routes
* unnecessary dependencies
* premature architecture
* duplicated logic
* giant components

Do not introduce a pattern only because it is considered "enterprise".

---

## Content Architecture

Portfolio content must live in:

`src/data/portfolio.ts`

UI components must not contain portfolio-specific content.

Adding a new:

* skill
* project
* experience item
* social link
* image

must not require modifying section components.

Use typed localized data:

```ts
type LocalizedText = {
  en: string;
  uz: string;
};
```

English is the default locale.

Uzbek is the secondary locale.

Routes:

`/` → English

`/uz` → Uzbek

Do not create a client-side global language store.

---

## Image Rules

Store local images under:

`public/images/`

Use meaningful file names.

Prefer WebP or AVIF where appropriate.

Use Next.js Image.

Every content image requires meaningful alt text.

Do not use decorative stock imagery simply to fill empty space.

Project images should show the actual project whenever possible.

---

## Visual Design Rules

The site must look intentionally designed.

Avoid generic AI portfolio aesthetics.

Do NOT default to:

* purple/blue gradient backgrounds
* excessive glassmorphism
* excessive blur
* excessive glowing borders
* floating blobs
* decorative particles
* excessive rounded cards
* card-inside-card layouts
* repetitive 3-column card grids
* huge empty hero sections
* excessive badges
* animation everywhere

Use visual contrast through:

* typography
* spacing
* scale
* alignment
* image composition
* subtle borders
* restrained motion

Do not use decoration where hierarchy can solve the problem.

---

## Typography

Typography is a first-class design element.

Use a deliberate type scale.

The hierarchy must clearly distinguish:

* eyebrow
* H1
* section heading
* body text
* metadata
* CTA

Avoid using extremely large text merely to make the hero look impressive.

Do not use more than two font families unless there is a strong design reason.

Use a modern professional sans-serif as the default.

---

## Layout

Use a consistent content container.

Maintain a coherent spacing rhythm.

Desktop and mobile must be intentionally composed.

Do not simply shrink desktop layouts for mobile.

Important content should remain visible within the first viewport.

Avoid excessive empty space.

---

## Animation

Animation is supporting design, not the main attraction.

Use:

* subtle entrance transitions
* hover feedback
* small transforms
* restrained section reveals

Avoid:

* infinite background animations
* excessive parallax
* bouncing UI
* animation on every element

Respect:

`prefers-reduced-motion`

---

## UX

Every interactive element must communicate:

* what it does
* where it leads
* what state it is in

Links must look like links.

Buttons must look like buttons.

Do not make large areas clickable without clear indication.

Mobile interactions must be touch-friendly.

---

## Accessibility

Use semantic HTML.

Provide:

* alt text
* keyboard support
* visible focus states
* accessible labels
* correct heading hierarchy
* sufficient contrast

Do not sacrifice accessibility for visual effects.

---

## SEO

Every page must have appropriate:

* title
* description
* canonical URL where appropriate
* Open Graph metadata

Project pages must generate meaningful metadata.

English and Uzbek pages must be distinguishable to search engines.

---

## Performance

Prefer static rendering.

Avoid unnecessary client-side JavaScript.

Do not add a library when CSS or native Next.js functionality solves the problem.

Optimize images.

Avoid unnecessary third-party scripts.

---

## Content Integrity

Never invent:

* clients
* employers
* years of experience
* awards
* revenue
* users
* achievements
* testimonials

Use only supplied information.

Use placeholders when real content is unavailable.

---

## Visual QA

Do not consider the task complete simply because the code builds.

After implementation:

1. run the development server
2. inspect the site in a browser
3. verify desktop layout
4. verify mobile layout
5. inspect spacing and typography
6. inspect image rendering
7. inspect interactions
8. fix visual defects
9. run lint
10. run production build

The final result must look intentional, not merely technically correct.

---

## Decision Rule

When multiple implementation choices are possible:

Choose the simplest option that provides the best user experience and long-term maintainability.

Do not introduce complexity unless the current requirement actually needs it.

Continue implementation without asking non-blocking questions.

Ask only when missing information makes correct implementation impossible.
