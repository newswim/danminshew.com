import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('writing', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const abs = (path: string) => new URL(path, site).href;

  const lines = [
    '# Dan Minshew',
    '',
    '> Personal site of Dan Minshew — software engineer and musician in Austin, Texas.',
    '> Work, projects, two decades of bands, and writing on living systems: code, land, sound, attention.',
    '',
    '## Pages',
    '',
    `- [About](${abs('/about/')}): who Dan is`,
    `- [Work](${abs('/work/')}): professional history and capabilities`,
    `- [Projects](${abs('/projects/')}): apps, civic tech, community work`,
    `- [Music](${abs('/music/')}): bands, recordings, and the ongoing archive`,
    `- [Writing](${abs('/writing/')}): essays, notes, and thoughts`,
    `- [Colophon](${abs('/colophon/')}): how this site is built`,
    '',
    '## Writing',
    '',
    ...posts.map((p) => `- [${p.data.title}](${abs(`/writing/${p.id}/`)}): ${p.data.description}`),
    '',
    '## Machine-readable',
    '',
    `- [RSS feed](${abs('/rss.xml')})`,
    `- [Sitemap](${abs('/sitemap-index.xml')})`,
    `- [humans.txt](${abs('/humans.txt')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
