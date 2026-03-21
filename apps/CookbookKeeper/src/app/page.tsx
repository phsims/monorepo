import { HeroBanner } from 'components/react/organisms/hero-banner';
import { Button } from 'components/react/atoms/button';
import { getRandomRecipes } from 'api/spoonacular';
import { RecipesSearchClient } from './recipes-search-client';

export default async function Index() {
  const { recipes } = await getRandomRecipes({ number: 8 });

  return (
    <div className="space-y-8">
      <HeroBanner
        layout="contained"
        leftContent={
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Welcome to Your Cookbook
            </h1>
            <p className="mt-2 text-lg text-neutral-600">
              Discover, save, and organize your favorite recipes all in one
              place
            </p>
            <div className="mt-6">
              <Button
                ariaLabel="Get started"
                title="Get started"
                variant="primary"
              />
            </div>
          </div>
        }
        rightContent={
          <div className="flex items-center justify-center px-4 py-6 sm:p-8">
            <div className="h-48 w-full max-w-md rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-500">
              Placeholder for image or media
            </div>
          </div>
        }
        split="50-50"
      />
      <RecipesSearchClient initialRecipes={recipes} />
    </div>
  );
}
