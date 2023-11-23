import { zodiosRouter } from '@zodios/express';
import { definition } from './definition';
import { recipes } from '../mockData';
export const router = zodiosRouter(definition);

router.get('/v1/recipes', async ({ query }, res) => {
  const { limit, rating } = query;
  let results = recipes;

  if (rating) results = recipes.sort((a, b) => b.rating - a.rating);

  if (limit) return res.status(200).json(results.slice(0, limit));

  return res.status(200).json(results);
});

router.get('/v1/recipes/:id', async (req, res) => {
  const recipe = recipes.find((recipe) => recipe.id === req.params.id);

  return res.status(200).json(recipe);
});

router.get('/v1/favourites', async (req, res) => {
  return res.status(200).json(recipes);
});

router.post('/v1/favourites', async (req, res) => {
  return res.status(501);
});
