import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** 制作実績（src/content/works/*.mdx） */
const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    number: z.string(),               // "01" など表示用の番号
    category: z.string(),             // "WEB APP" など
    year: z.string(),
    summary: z.string(),              // 一覧カードと詳細ページ冒頭に出る一言
    period: z.string().optional(),    // "2025.04 — 2025.09"
    role: z.string().optional(),      // "個人開発（企画・設計・実装・運用）"
    tech: z.array(z.string()).default([]),
    thumbnail: z.string().optional(), // /images/works/xxx.png（public 配下）
    thumbnailAlt: z.string().optional(),
    thumbnailFit: z.enum(['cover', 'contain']).default('cover'), // グラフや図は contain（切らずに全体を表示）
    kind: z.enum(['work', 'research']).default('work'), // research にすると研究セクションに表示
    featured: z.boolean().default(false), // true にすると一覧で大きく表示
    order: z.number().default(99),
    links: z
      .object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        slides: z.string().url().optional(),
      })
      .default({}),
    draft: z.boolean().default(false),
  }),
});

/** 研究（src/content/research/*.md）— 通常は1件 */
const research = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    lab: z.string(),                 // 所属研究室・指導教員
    keywords: z.array(z.string()).default([]),
    image: z.string().optional(),    // 概念図
    imageAlt: z.string().optional(),
  }),
});

/** 発表・論文（src/data/publications.yaml） */
const publications = defineCollection({
  loader: file('./src/data/publications.yaml'),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    venue: z.string(),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

/** 活動（src/data/activities.yaml） */
const activities = defineCollection({
  loader: file('./src/data/activities.yaml'),
  schema: z.object({
    category: z.string(),
    period: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

/** 経歴（src/data/experience.yaml） */
const experience = defineCollection({
  loader: file('./src/data/experience.yaml'),
  schema: z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number().default(0),
  }),
});

/** スキル（src/data/skills.yaml） */
const skills = defineCollection({
  loader: file('./src/data/skills.yaml'),
  schema: z.object({
    category: z.string(),
    items: z.array(z.string()),
    order: z.number().default(0),
  }),
});

export const collections = { works, research, publications, activities, experience, skills };
