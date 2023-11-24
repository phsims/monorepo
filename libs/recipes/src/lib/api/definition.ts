import { makeEndpoint, makeApi } from '@zodios/core';
import { z } from 'zod';
import {} from '@zodios/core';
import { RecipeSchema } from './schemas';

const getRecipes = makeEndpoint({
  method: 'get',
  path: '/v1/recipes',
  response: z.array(RecipeSchema),
  alias: 'getRecipes',
  description: 'Get first page of recipes',
  parameters: [
    {
      name: 'limit',
      description: 'Limit',
      type: 'Query',
      schema: z.number().positive().optional(),
    },
    {
      name: 'rating',
      description: 'rating',
      type: 'Query',
      schema: z.boolean().optional(),
    },
  ],
});

const getRecipebyId = makeEndpoint({
  method: 'get',
  path: '/v1/recipes/:id',
  response: RecipeSchema,
  alias: 'getRecipebyId',
  description: 'Get recipe by ID',
});

const getFavourites = makeEndpoint({
  method: 'get',
  path: '/v1/favourites',
  response: z.array(RecipeSchema),
  alias: 'getFavourites',
  description: 'Get list of favourite recipes',
});

const createFavourite = makeEndpoint({
  method: 'post',
  path: '/v1/favourites',
  response: z.array(RecipeSchema),
  alias: 'createFavourite',
  description: 'Create a new favourite',
});

export const recipesApi = makeApi([
  getRecipes,
  getRecipebyId,
  getFavourites,
  createFavourite,
]);
export default recipesApi;
