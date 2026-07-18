# Tech decisions

| Decision | Status | Rationale |
|---|---|---|
| Astro | **proposed** | Content-collections + markdown/MDX fit a content-driven site; zero JS by default (fast, SEO-friendly); React islands available where interactivity is earned; first-class Vercel adapter. Dan is comfortable with React/TS. |
| Plain CSS with custom properties | **proposed** | No Tailwind (Dan's constraint). A small set of design tokens (color, type scale, spacing) in `:root`, scoped styles per component. Astro supports scoped `<style>` natively — no CSS-in-JS runtime needed. |
| TypeScript | **proposed** | Dan's home turf; Astro is TS-native. |
| Vercel for deploys | **accepted** | Dan's account and preference. |
| No backend | **accepted (for now)** | Static output. If contact forms or similar arrive later: Vercel functions or a third-party form endpoint. |
| PostHog analytics | **deferred** | Add when there's traffic worth understanding. Dan already has an org. |
| Content as markdown/MDX in-repo | **proposed** | Owned, portable, versioned. Writing = commit a file. CMS only if publishing friction proves real. |

## SEO baseline (build into v1, not bolted on)

- Semantic HTML, one `h1` per page, real landmarks
- Per-page `title` + `meta description`, canonical URLs, OpenGraph/Twitter cards
- `schema.org/Person` JSON-LD on home/about; `Article` on writing pages
- `sitemap.xml` + `robots.txt` + RSS (Astro integrations cover all three)
- Fast by construction: static HTML, optimized images (`astro:assets`), system or self-hosted fonts

## Open questions

- Font direction (system stack vs. one self-hosted face) — taste call, decide during design
- Dark mode: probably yes via `prefers-color-scheme`, cheap with tokens
