export {
  SpoonacularClient,
  createSpoonacularClient,
} from './lib/spoonacular-api';

export type {
  GetRandomRecipesOptions,
  GetRecipeInformationOptions,
  SearchRecipesOptions,
  RandomRecipesResponse,
  SpoonacularRecipe,
  SimilarRecipe,
} from './lib/types';

import type {
  GetRandomRecipesOptions,
  RandomRecipesResponse,
  SearchRecipesOptions,
} from './lib/types';
import { createSpoonacularClient } from './lib/spoonacular-api';

/**
 * Convenience helper for server components.
 * Uses `process.env.SPOONACULAR_API_KEY` at runtime.
 *
 * If the API key is missing (e.g. local dev/CI), returns an empty result
 * so builds don’t fail during prerender.
 */
export async function getRandomRecipes(
  options: GetRandomRecipesOptions = {},
): Promise<RandomRecipesResponse> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey?.trim()) return { recipes: [] };

  try {
    const client = createSpoonacularClient(apiKey);
    return await client.getRandomRecipes(options);
  } catch {
    return { recipes: [] };
  }
}

/**
 * Convenience helper for server components/routes.
 * Uses `process.env.SPOONACULAR_API_KEY` at runtime.
 */
export async function getRecipesByQuery(
  options: SearchRecipesOptions,
): Promise<RandomRecipesResponse> {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey?.trim()) return { recipes: [] };

  try {
    const client = createSpoonacularClient(apiKey);
    const res = await client.searchRecipes(options);
    return { recipes: res.results ?? [] };
  } catch {
    return { recipes: [] };
  }
}
