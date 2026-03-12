/**
 * Types for the Spoonacular Food API.
 * @see https://spoonacular.com/food-api/docs#Get-Random-Recipes
 */

/** Options for the Get Random Recipes endpoint */
export interface GetRandomRecipesOptions {
  /** Number of random recipes to return (1–100). Default 1. */
  number?: number;
  /** Include nutritional information in each recipe. */
  includeNutrition?: boolean;
  /** Tags the recipe must have (diets, meal types, cuisines, or intolerances). Comma-separated, e.g. "vegetarian,dessert". */
  includeTags?: string;
  /** Tags the recipe must NOT have. Comma-separated. */
  excludeTags?: string;
}

/** Options for the Get Recipe Information endpoint */
export interface GetRecipeInformationOptions {
  /** Include nutrition data in the recipe information. */
  includeNutrition?: boolean;
  /** Add a wine pairing object to the recipe. */
  addWinePairing?: boolean;
  /** Add taste data to the recipe. */
  addTasteData?: boolean;
}

/** Minimal recipe shape returned by Get Random Recipes (same as Get Recipe Information). */
export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  cookingMinutes?: number;
  preparationMinutes?: number;
  sourceUrl?: string;
  spoonacularSourceUrl?: string;
  summary?: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  vegan?: boolean;
  vegetarian?: boolean;
  dairyFree?: boolean;
  glutenFree?: boolean;
  veryHealthy?: boolean;
  veryPopular?: boolean;
  cheap?: boolean;
  [key: string]: unknown;
}

/** Response from GET /recipes/random */
export interface RandomRecipesResponse {
  recipes: SpoonacularRecipe[];
}

/** Minimal shape for a recipe returned by GET /recipes/{id}/similar */
export interface SimilarRecipe {
  id: number;
  title: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}
