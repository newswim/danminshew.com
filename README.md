# danminshew.com

Personal site of Dan Minshew — software engineer and musician in Austin, Texas. A home base
outside the feeds: work, projects, two decades of bands, and writing.

Live at **[danminshew.com](https://danminshew.com)** — see the
[colophon](https://danminshew.com/colophon/) for how and why.

## Stack

- [Astro](https://astro.build) + TypeScript, fully static output
- Plain CSS custom properties — no frameworks, no preprocessors. The entire visual system
  (color, type, spacing, light/dark) lives in [`src/styles/tokens.css`](src/styles/tokens.css)
- Content as markdown/MDX collections in `src/content/` — publishing is: commit a file, push
- Deploys: Vercel, automatic on push to `main`
- Findable by design: sitemap, RSS, `schema.org` JSON-LD, [`/llms.txt`](https://danminshew.com/llms.txt)
  for agents, [`/humans.txt`](https://danminshew.com/humans.txt) for the rest of us

## Developing

```sh
npm install
npm run dev      # localhost:4321
npm run build    # static build → dist/
```

## Knowledge base

This project is built docs-first: [`/docs`](docs/README.md) holds the brief, site map, voice
guide, tech decisions, a mutable status snapshot, an immutable decision record, and the
digital-archiving track that runs alongside the site. The folder doubles as the project's own
case study.
