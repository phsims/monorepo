import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  description: z.string(),
  author: z.string(),
  ingredients: z.array(z.string()),
  method: z.array(z.string()),
  rating: z.number(),
  image: z.string() || undefined,
});
export type Recipe = z.infer<typeof RecipeSchema>;
