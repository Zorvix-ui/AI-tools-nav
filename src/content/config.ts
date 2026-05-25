import { defineCollection, z } from "astro:content";

const tools = defineCollection({
  schema: z.object({
    name: z.string(),
    category: z.string(),
    region: z.enum(["国内", "国外"]),
    rank: z.number().min(1),
    description: z.string(),
    url: z.string().url(),
    pricing: z.enum(["免费", "免费增值", "付费"]),
    rating: z.number().min(0).max(5).optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    publishDate: z.date().optional(),
  }),
});

export const collections = { tools };
