# Status

> Mutable snapshot, shared between agents/sessions — overwrite freely, keep it current. History lives in git; decision points live in [decisions.md](decisions.md).
> **Last updated: 2026-07-18 (night)**

## Where things stand

Infrastructure phase is **done**: site live at https://danminshew.com (TLS, www→apex 308, auto-deploy on push), SEO baseline + agent routes shipped, rotating epigraph + colophon landed (D-012/D-013), taste principle recorded in [voice.md](voice.md). The project is now content-bound.

## Waiting on Dan

- **Projects page review** (rebuilt 2026-07-18 as content collection, D-014): check the copy in `src/content/projects/*.md`; fill in `stack:` arrays (left empty rather than guessed); supply a Texas Defense Data screenshot (the alpha is password-gated, so no capture) — drop it in `src/content/projects/images/` + one frontmatter line.

- **Content drafts** — about, work, music, projects (incl. a ThisTownSucks description). Workflow: Dan drafts raw → Claude does a voice pass against [voice.md](voice.md).
- **404 copy taste review** — current "Nothing grows here / back to the trailhead" predates the D-013 restraint principle; Dan should keep or kill.
- Epigraph curation in `src/data/epigraphs.ts` (optional, ongoing)
- **Google Search Console** — needs Dan's Google account: verify domain, submit sitemap. Biggest remaining SEO lever.
- Archive track: YouTube hunt (Dan, independent), Michael Briggs outreach, physical-media inventory, "where are the original Frosted Tips mixes?", Pry EP source capture this weekend

## Claude-side queue (small, non-blocking)

- ~~OG image~~ — done 2026-07-18: light/paper card (Dan's pick from two mockups), wired site-wide
- ~~apple-touch-icon~~, ~~astro check in build~~ — done 2026-07-18
- Lighthouse/a11y pass once real content exists (placeholder pages would skew it)
- 404 copy reviewed by Dan — keeping it

## Parked ideas

- **Library × book exchange app** (2026-07-18): Goodreads meets lending — list your library, loan books to friends. Another day.
