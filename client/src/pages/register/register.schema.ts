import { z } from 'zod';

const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long' });

export const registerSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;