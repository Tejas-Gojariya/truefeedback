import { z } from 'zod';

export const SocialLinksSchema = z.object({
    linkedin: z.string().url().optional(),
    x: z.string().url().optional(),
    discord: z.string().url().optional(),
    dribbble: z.string().url().optional(),
})