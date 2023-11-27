import { z } from 'zod';

export const TimesSchema = z.object({
  cook: z.string().optional(),
  prep: z.string().optional(),
});

export const RecipeSchema = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string(),
  author: z.string(),
  ingredients: z.array(z.string()),
  method: z.array(z.string()),
  id: z.string().optional(),
  rating: z.number().optional(),
  image: z.string().optional(),
  times: TimesSchema,
  servings: z.string(),
});

export type Times = z.infer<typeof TimesSchema>;

export type Recipe = z.infer<typeof RecipeSchema>;
