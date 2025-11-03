import { z } from "zod";

export const PRODUCT_CATEGORIES = ["earrings", "necklaces", "bracelets", "rings", "jewellery-sets"] as const;

export const productFormSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be 0 or greater"),
    category: z.enum(PRODUCT_CATEGORIES, { message: "Category is required" }),
    image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;