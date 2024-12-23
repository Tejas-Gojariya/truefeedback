import { z } from 'zod';

export const verifyScema = z.object({
    code: z.string().length(6, "verfication code must be 6 characters long")
})