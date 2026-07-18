# Decision record

Immutable, append-only. New decisions get the next ID; a reversal is a *new* entry marked `supersedes D-xxx`, never an edit. Detailed rationale lives where linked; this is the index of decision points.

| ID | Date | Decision | Status |
|---|---|---|---|
| D-001 | 2026-07-18 | Docs-first knowledge base in `/docs`; project itself doubles as a portfolio entry | accepted |
| D-002 | 2026-07-18 | Repo starts private, intended to flip public later; `docs/private/` gitignored from day one so nothing sensitive ever enters git history | accepted |
| D-003 | 2026-07-18 | Reclaim GitHub name: old repo renamed `danminshew.com-2018` (preserved, redirects); fresh private repo created | accepted, done |
| D-004 | 2026-07-18 | No Tailwind — plain CSS with custom properties (design tokens) | accepted (Dan's constraint) |
| D-005 | 2026-07-18 | Vercel for deploys; no backend; PostHog deferred until traffic warrants | accepted |
| D-006 | 2026-07-18 | Stack: Astro + TypeScript, content as markdown/MDX collections — see [tech.md](tech.md) for rationale | proposed |
| D-007 | 2026-07-18 | Project brief approved by Dan — see [brief.md](brief.md) | accepted |
| D-008 | 2026-07-18 | Knowledge base splits mutable [status.md](status.md) from this immutable decision record, replacing the combined log.md | accepted |
| D-009 | 2026-07-18 | Stack accepted by Dan (accepts D-006). SCSS considered and declined — modern baseline CSS (custom properties, nesting, color-mix) makes a precompiler unnecessary | accepted |
| D-010 | 2026-07-18 | Agent/bot-facing routes from day one: dynamic `/llms.txt` (auto-indexes writing), `/humans.txt`, robots.txt pointer — SEO + agent-readability as first-class | accepted |
| D-011 | 2026-07-18 | Vercel project `danminshew-com` under team `newswim`; production deploys via CLI until GitHub App access is granted, then git auto-deploys; apex + www attached to project | accepted, done |
| D-012 | 2026-07-18 | Fixed footer slogan replaced by a rotating epigraph: random per visit from a curated list (`src/data/epigraphs.ts`), stable default `riverrun` in static HTML for crawlers/no-JS, linking to `/colophon` which lists the collection and explains the build | accepted |
| D-013 | 2026-07-18 | Epigraph stays unexplained (amends D-012): plain text, no link, no on-site gloss or listed collection; /colophon reduced to build notes. Standing taste principle recorded in [voice.md](voice.md): the site never explains its own references — restraint by default, Dan has final say on style | accepted |
| D-014 | 2026-07-18 | Projects page rebuilt as a content collection: one markdown file per project with purpose/stack/status/section/images frontmatter; cards render framed screenshots (astro:assets-optimized), purpose deck line, prose body, quiet stack line. Screenshots captured from the live sites | accepted |
| D-015 | 2026-07-18 | Project galleries = uniform 3:2 cropped thumbnails, click to expand full image in a native `<dialog>` lightbox (amends D-014's scroll strip). No library; no-JS fallback links to the image file | accepted |
| D-016 | 2026-07-18 | Visual identity: fractal-tree mark replaces the placeholder sprout — "grown, not optimized" made literal (recursion for the systems side; trees and rivers share the dendritic form, so riverrun/newswim ride along unglossed). Grown deterministically from Dan's tree-lab parameters (depth 4, spread 28°, ratio 0.73, asym 0.55, curve 0.7, lean 4°) at seed 55, via `scripts/generate-mark.mjs` (`npm run mark`); a depth-3 "young tree" of the same DNA serves small sizes. Bare-glyph favicon (dark-mode via SVG media query, Dan's pick over moss tile); mark also in header beside the wordmark (Dan's pick), OG card, and apple-touch-icon | accepted |
| D-017 | 2026-07-18 | Header shows the mark alone (amends D-016): the wordmark text doubled the home page's h1, so the nav carries only the tree, linked home with an aria-label | accepted |
| D-018 | 2026-07-18 | OG card composition (amends D-016): name + tagline left, full tree standing on a ground hairline right ("anchored" layout, Dan's pick over bookplate and grove). Tagline is the plain-facts line — "Software engineer & musician in Austin, Texas." — a placeholder while Dan looks for a phrase he likes better | accepted |
