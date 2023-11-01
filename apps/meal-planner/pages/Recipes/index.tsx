import { useRouter } from 'next/router';
import { RecipesRoutes } from 'libs/recipes/src';

export function Recipes() {
  const router = useRouter();
  const routePath = router.pathname;
  const CurrentRoute = RecipesRoutes[routePath as keyof typeof RecipesRoutes];

  return (
    <CurrentRoute />
  );
}

export default Recipes;
