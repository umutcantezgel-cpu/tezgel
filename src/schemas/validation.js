import { z } from 'zod';

export const projectSchema = z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string().min(1),
    description: z.string(),
    image: z.string().url().or(z.string().startsWith('/')), // Allow local paths
    category: z.string(),
    // Add other fields as loose requirements for now to avoid breaking existing data
    location: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
    features: z.array(z.string()).optional(),
}).passthrough(); // Allow unknown keys for forward compatibility

export const blogPostSchema = z.object({
    id: z.union([z.string(), z.number()]),
    title: z.string().min(1),
    content: z.string(),
    excerpt: z.string().optional(),
    author: z.object({
        name: z.string(),
        role: z.string().optional(),
        avatar: z.string().optional()
    }).optional(),
    date: z.string().optional(),
    category: z.string().optional(),
}).passthrough();

// Map storage keys to schemas
export const schemas = {
    'tezgel_content_projects': z.object({
        projects: z.array(projectSchema),
        categories: z.array(z.any())
    }).or(z.array(projectSchema)), // Handle both formats
    'tezgel_content_blog_posts': z.array(blogPostSchema),
};
