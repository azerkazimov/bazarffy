import { z } from "zod";

export const productFormSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be 0 or greater"),
    image: z.string().url("Must be a valid URL"),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;