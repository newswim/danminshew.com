// The site mark: a fractal tree in stipple — separated dots along the branch
// skeleton, sized by branch depth. Regenerates public/favicon.svg,
// public/apple-touch-icon.png, public/og.png. The header mark in
// src/components/Header.astro shares the YOUNG dots.
// Run: npm run mark   (D-016; stippled rendering D-020, upright type D-019)
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// Dan's parameters (tree lab, 2026-07-18) + organic refinement
const FULL = { depth: 4, spread: 28, ratio: 0.73, asym: 0.55, curve: 0.7, lean: 4, len0: 28, jitterAng: 0.08, jitterLen: 0.12, prune: 0.2, pruneDeep: 0.38 };
// young tree for small sizes: depth 3, shorter trunk, wider spread
const YOUNG = { ...FULL, depth: 3, len0: 19, spread: 33, prune: 0.15, pruneDeep: 0.2 };
const SEED = 55;
// dot sizing: r0 at the trunk, tapering per depth; gapK ~3 leaves air between dots
const FULL_DOTS = { r0: 2.2, taper: 0.78, minR: 0.9, gapK: 3.0 };
const YOUNG_DOTS = { r0: 3.6, taper: 0.84, minR: 2.0, gapK: 2.9 };

const MOSS = '#4a6b4f', MOSS_DARK = '#8fae8b', PAPER = '#faf7f0', INK = '#2b352e';
const FADED = '#6b7a6e', GROUND = '#ddd6c6';

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

function bez(s, t) {
  const u = 1 - t;
  return [u * u * s.P[0] + 2 * u * t * s.C[0] + t * t * s.E[0], u * u * s.P[1] + 2 * u * t * s.C[1] + t * t * s.E[1]];
}

// beads along each branch curve, spaced by radius; joints keep a single bead
function dotsFor(P, seed, { r0, taper, minR, gapK }) {
  const dots = [];
  for (const s of genTree(P, seed)) {
    const r = Math.max(minR, r0 * Math.pow(taper, s.d));
    const N = 24;
    const pts = [];
    let len = 0, prev = null;
    for (let i = 0; i <= N; i++) {
      const p = bez(s, i / N);
      if (prev) len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      pts.push([p[0], p[1], len]);
      prev = p;
    }
    const n = Math.max(1, Math.round(len / (r * gapK)));
    for (let k = s.d === 0 ? 0 : 1; k <= n; k++) {
      const target = (len * k) / n;
      const p = pts.find((pp) => pp[2] >= target) ?? pts[pts.length - 1];
      dots.push({ x: p[0], y: p[1], r });
    }
  }
  return dots;
}

const f = (n) => +n.toFixed(2);
const circles = (dots) => dots.map((d) => `<circle cx="${f(d.x)}" cy="${f(d.y)}" r="${f(d.r)}"/>`).join('\n    ');
function bboxOf(dots) {
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const d of dots) {
    minX = Math.min(minX, d.x - d.r); maxX = Math.max(maxX, d.x + d.r);
    minY = Math.min(minY, d.y - d.r); maxY = Math.max(maxY, d.y + d.r);
  }
  const pad = 2.5, w = maxX - minX + 2 * pad, h = maxY - minY + 2 * pad;
  const size = Math.max(w, h);
  return [f(minX - pad - (size - w) / 2), f(minY - pad - (size - h) / 2), f(size), f(size)];
}

const youngDots = dotsFor(YOUNG, SEED, YOUNG_DOTS);
const fullDots = dotsFor(FULL, SEED, FULL_DOTS);
const youngBox = bboxOf(youngDots);

// favicon: bare beaded young tree, adapts to dark tabs
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${youngBox.join(' ')}">
  <style>
    circle { fill: ${MOSS}; }
    @media (prefers-color-scheme: dark) {
      circle { fill: ${MOSS_DARK}; }
    }
  </style>
  <g>
    ${circles(youngDots)}
  </g>
</svg>
`
);

// apple-touch-icon: paper beads on moss, 180px (iOS requires opaque)
const [yx, yy, ys] = youngBox;
const ts = 128 / ys;
const touch = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="${MOSS}"/>
  <g transform="translate(${(90 - ts * (yx + ys / 2)).toFixed(1)} ${(90 - ts * (yy + ys / 2)).toFixed(1)}) scale(${ts.toFixed(3)})" fill="${PAPER}">
    ${circles(youngDots)}
  </g>
</svg>`;

// og: name + tagline left (upright Iowan), beaded full tree planted on a ground line right
let fMinY = 0;
for (const d of fullDots) fMinY = Math.min(fMinY, d.y - d.r);
const ogScale = (340 / -fMinY).toFixed(3);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <line x1="96" y1="470" x2="1104" y2="470" stroke="${GROUND}" stroke-width="2.5"/>
  <g transform="translate(940 470) scale(${ogScale})" fill="${MOSS}">
    ${circles(fullDots)}
  </g>
  <text x="110" y="310" font-family="Iowan Old Style, Palatino, Georgia, serif" font-weight="500" font-size="92" fill="${INK}">Dan Minshew</text>
  <text x="112" y="380" font-family="Iowan Old Style, Palatino, Georgia, serif" font-size="33" fill="${FADED}">Software engineer &amp; musician in Austin, Texas.</text>
</svg>`;

await sharp(Buffer.from(touch)).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('regenerated favicon.svg, apple-touch-icon.png, og.png (stippled, seed', SEED + ')');
