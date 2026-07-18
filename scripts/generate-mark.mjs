// The site mark: a fractal tree, grown deterministically from tuned parameters.
// Regenerates public/favicon.svg, public/apple-touch-icon.png, public/og.png.
// The header mark in src/components/Header.astro shares the YOUNG geometry below.
// Run: npm run mark   (D-016)
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// Dan's parameters (tree lab, 2026-07-18) + organic refinement
const FULL = { depth: 4, spread: 28, ratio: 0.73, asym: 0.55, curve: 0.7, lean: 4, len0: 28, jitterAng: 0.08, jitterLen: 0.12, prune: 0.2, pruneDeep: 0.38 };
// young tree for small sizes: depth 3, shorter trunk, wider spread
const YOUNG = { ...FULL, depth: 3, len0: 19, spread: 33, prune: 0.15, pruneDeep: 0.2 };
const SEED = 55;

const MOSS = '#4a6b4f', MOSS_DARK = '#8fae8b', PAPER = '#faf7f0', INK = '#2b352e';

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genTree(P, seed) {
  const rnd = mulberry32(seed);
  const segs = [];
  // heading 0 = up; dir(a) = (sin a, -cos a)
  function branch(x, y, heading, parentHeading, len, d) {
    if (d > P.depth || len < 1) return;
    const h = heading + (rnd() * 2 - 1) * P.jitterAng * (d > 0 ? 1 : 0.3);
    const L = len * (1 + (rnd() * 2 - 1) * P.jitterLen);
    const E = [x + L * Math.sin(h), y - L * Math.cos(h)];
    // control point blends toward the parent's terminal heading -> tangent-continuous grain
    const cAng = parentHeading + (h - parentHeading) * (1 - P.curve * 0.75);
    const C = [x + L * 0.45 * Math.sin(cAng), y - L * 0.45 * Math.cos(cAng)];
    const termHeading = Math.atan2(E[0] - C[0], -(E[1] - C[1]));
    segs.push({ P: [x, y], C, E, d });
    if (d === P.depth) return;
    const sp = (P.spread * Math.PI) / 180;
    const kids = [
      [termHeading - sp * (1 - 0.4 * P.asym) + (rnd() * 2 - 1) * P.jitterAng, L * P.ratio * (1 + 0.18 * P.asym)],
      [termHeading + sp * (1 + 0.4 * P.asym) + (rnd() * 2 - 1) * P.jitterAng, L * P.ratio * (1 - 0.22 * P.asym)],
    ];
    const pr = d >= 3 ? P.pruneDeep : d >= 2 ? P.prune : 0;
    let kept = kids.filter(() => !(rnd() < pr));
    if (kept.length === 0) kept = [kids[rnd() < 0.5 ? 0 : 1]];
    for (const [a, l] of kept) branch(E[0], E[1], a, termHeading, l, d + 1);
  }
  const lean = (P.lean * Math.PI) / 180;
  branch(0, 0, lean, lean, P.len0, 0);
  return segs;
}

function pathsAndBox(segs, { w0, taper, minW }) {
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const s of segs)
    for (const [x, y] of [s.P, s.C, s.E]) {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  const pad = 4.5;
  const w = maxX - minX + 2 * pad, h = maxY - minY + 2 * pad;
  const size = Math.max(w, h);
  const f = (n) => +n.toFixed(2);
  const box = [f(minX - pad - (size - w) / 2), f(minY - pad - (size - h) / 2), f(size), f(size)];
  const paths = segs.map((s) => {
    const wd = Math.max(minW, w0 * Math.pow(taper, s.d));
    return `<path d="M${f(s.P[0])} ${f(s.P[1])} Q${f(s.C[0])} ${f(s.C[1])} ${f(s.E[0])} ${f(s.E[1])}" stroke-width="${f(wd)}"/>`;
  });
  return { paths, box };
}

const full = pathsAndBox(genTree(FULL, SEED), { w0: 6.4, taper: 0.8, minW: 2.2 });
const young = pathsAndBox(genTree(YOUNG, SEED), { w0: 5.8, taper: 0.88, minW: 2.6 });

// favicon: bare young tree, adapts to dark tabs
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${young.box.join(' ')}">
  <style>
    path { stroke: ${MOSS}; }
    @media (prefers-color-scheme: dark) {
      path { stroke: ${MOSS_DARK}; }
    }
  </style>
  <g fill="none" stroke-linecap="round">
    ${young.paths.join('\n    ')}
  </g>
</svg>
`
);

// apple-touch-icon: paper young tree on moss, 180px (iOS requires opaque)
const [yx, yy, ys] = young.box;
const ts = 128 / ys;
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${MOSS}"/>
  <g transform="translate(${(90 - ts * (yx + ys / 2)).toFixed(1)} ${(90 - ts * (yy + ys / 2)).toFixed(1)}) scale(${ts.toFixed(3)})" fill="none" stroke="${PAPER}" stroke-linecap="round">
    ${young.paths.join('\n    ')}
  </g>
</svg>`;

// og: full tree above the wordmark, paper card
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <g transform="translate(200 268) scale(1.95)" fill="none" stroke="${MOSS}" stroke-linecap="round">
    ${full.paths.join('\n    ')}
  </g>
  <text x="118" y="425" font-family="Iowan Old Style, Palatino, Georgia, serif" font-style="italic" font-weight="500" font-size="96" fill="${INK}">Dan Minshew</text>
</svg>`;

await sharp(Buffer.from(touch)).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('regenerated favicon.svg, apple-touch-icon.png, og.png (seed', SEED + ')');
