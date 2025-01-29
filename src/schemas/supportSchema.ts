import { z } from "zod";

export const username = z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const supportSchema = z.object({
    username: username,
    email: z.string().email({ message: 'Invalid email address' }),
    message: z
        .string()
        .min(10, "message must be at least 10 characters")
        .max(80, 'message must be no more than 20 characters')
});