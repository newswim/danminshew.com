import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      url: z.string().url().optional(),
      purpose: z.string(),
      stack: z.array(z.string()).default([]),
      status: z.string().optional(),
      section: z.enum(['building', 'civic']).default('building'),
      images: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
      order: z.number().default(0),
    }),
});

export const collections = { writing, projects };
