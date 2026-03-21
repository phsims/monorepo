import type {
  GetRandomRecipesOptions,
  GetRecipeInformationOptions,
  SearchRecipesOptions,
  ComplexSearchResponse,
  RandomRecipesResponse,
  SpoonacularRecipe,
  SimilarRecipe,
} from './types';

const SPOONACULAR_BASE = 'https://api.spoonacular.com';

/**
 * Client for the Spoonacular Food API.
 * Use from server-side only; pass the API key at construction (e.g. from env).
 */
export class SpoonacularClient {
  constructor(private readonly apiKey: string) {
    if (!apiKey?.trim()) {
      throw new Error('Spoonacular API key is required');
    }
  }

  /**
   * Get random (popular) recipes.
   * @see https://spoonacular.com/food-api/docs#Get-Random-Recipes
   */
  async getRandomRecipes(
    options: GetRandomRecipesOptions = {},
  ): Promise<RandomRecipesResponse> {
    const params = new URLSearchParams();
    params.set('apiKey', this.apiKey);

    const { number = 5, includeNutrition, includeTags, excludeTags } = options;
    if (number !== undefined) {
      params.set('number', String(Math.min(100, Math.max(1, number))));
    }
    if (includeNutrition === true) {
      params.set('includeNutrition', 'true');
    }
    if (includeTags) {
      params.set('include-tags', includeTags);
    }
    if (excludeTags) {
      params.set('exclude-tags', excludeTags);
    }

    const url = `${SPOONACULAR_BASE}/recipes/random?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Spoonacular API error ${res.status}: ${text || res.statusText}`,
      );
    }

    return res.json() as Promise<RandomRecipesResponse>;
  }

  /**
   * Get full information about a recipe by id.
   * @see https://spoonacular.com/food-api/docs#Get-Recipe-Information
   */
  async getRecipeInformation(
    id: number,
    options: GetRecipeInformationOptions = {},
  ): Promise<SpoonacularRecipe> {
    const params = new URLSearchParams();
    params.set('apiKey', this.apiKey);

    const { includeNutrition, addWinePairing, addTasteData } = options;
    if (includeNutrition === true) {
      params.set('includeNutrition', 'true');
    }
    if (addWinePairing === true) {
      params.set('addWinePairing', 'true');
    }
    if (addTasteData === true) {
      params.set('addTasteData', 'true');
    }

    const url = `${SPOONACULAR_BASE}/recipes/${id}/information?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Spoonacular API error ${res.status}: ${text || res.statusText}`,
      );
    }

    return res.json() as Promise<SpoonacularRecipe>;
  }

  /**
   * Get recipes which are similar to the given one.
   * @see https://spoonacular.com/food-api/docs#Get-Similar-Recipes
   */
  async getSimilarRecipes(id: number, number = 10): Promise<SimilarRecipe[]> {
    const params = new URLSearchParams();
    params.set('apiKey', this.apiKey);
    params.set('number', String(Math.min(100, Math.max(1, number))));

    const url = `${SPOONACULAR_BASE}/recipes/${id}/similar?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Spoonacular API error ${res.status}: ${text || res.statusText}`,
      );
    }

    return res.json() as Promise<SimilarRecipe[]>;
  }

  /**
   * Search recipes by a text query.
   * Uses Spoonacular `recipes/complexSearch` endpoint.
   */
  async searchRecipes(
    options: SearchRecipesOptions,
  ): Promise<ComplexSearchResponse> {
    const { query, number: numberOpt = 8 } = options;

    const params = new URLSearchParams();
    params.set('apiKey', this.apiKey);
    params.set('query', query);
    params.set('number', String(Math.min(100, Math.max(1, numberOpt ?? 8))));

    // Include extra fields like summary/instructions when available.
    params.set('addRecipeInformation', 'true');

    const url = `${SPOONACULAR_BASE}/recipes/complexSearch?${params.toString()}`;
    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(
        `Spoonacular API error ${res.status}: ${text || res.statusText}`,
      );
    }

    return res.json() as Promise<ComplexSearchResponse>;
  }
}

/**
 * Create a Spoonacular API client.
 * @param apiKey - Your Spoonacular API key (from env, e.g. process.env.SPOONACULAR_API_KEY).
 */
export function createSpoonacularClient(apiKey: string): SpoonacularClient {
  return new SpoonacularClient(apiKey);
}

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
