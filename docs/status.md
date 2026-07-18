# Status

> Mutable snapshot, shared between agents/sessions — overwrite freely, keep it current. History lives in git; decision points live in [decisions.md](decisions.md).
> **Last updated: 2026-07-18 (night)**

## Where things stand

Infrastructure phase is **done**: site live at https://danminshew.com (TLS, www→apex 308, auto-deploy on push), SEO baseline + agent routes shipped, rotating epigraph + colophon landed (D-012/D-013), taste principle recorded in [voice.md](voice.md). The project is now content-bound.

## Waiting on Dan

- **Content drafts** — about, work, music, projects (incl. a ThisTownSucks description). Workflow: Dan drafts raw → Claude does a voice pass against [voice.md](voice.md).
- **404 copy taste review** — current "Nothing grows here / back to the trailhead" predates the D-013 restraint principle; Dan should keep or kill.
- Epigraph curation in `src/data/epigraphs.ts` (optional, ongoing)
- **Google Search Console** — needs Dan's Google account: verify domain, submit sitemap. Biggest remaining SEO lever.
- Archive track: YouTube hunt (Dan, independent), Michael Briggs outreach, physical-media inventory, "where are the original Frosted Tips mixes?", Pry EP source capture this weekend

## Claude-side queue (small, non-blocking)

- Default **OG image** (social-share card) — real gap when links get shared; design is taste-sensitive, so mock first, show Dan before shipping
- `apple-touch-icon` (PNG) to complement the SVG favicon
- Consider `astro check` in the build for CI typechecking
- Lighthouse/a11y pass once real content exists (placeholder pages would skew it)

## Parked ideas

- **Library × book exchange app** (2026-07-18): Goodreads meets lending — list your library, loan books to friends. Another day.
