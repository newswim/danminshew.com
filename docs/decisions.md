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
