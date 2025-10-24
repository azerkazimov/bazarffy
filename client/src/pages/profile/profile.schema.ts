import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().min(2),
  sosialLinks: z.object({
    twitter: z.string().url(),
    facebook: z.string().url(),
    instagram: z.string().url(),
  }),
  avatar: z.string().optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;