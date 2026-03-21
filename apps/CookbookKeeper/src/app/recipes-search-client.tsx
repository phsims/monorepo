'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { SearchBar } from 'components/react/molecules/search-bar';
import { RecipeCard } from 'components/react/molecules/recipe-card';
import type { SpoonacularRecipe } from 'api/spoonacular';

type RecipesSearchClientProps = {
  initialRecipes: SpoonacularRecipe[];
};

export function RecipesSearchClient({
  initialRecipes,
}: RecipesSearchClientProps) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const searchRecipes = useCallback(
    async (query: string) => {
      const trimmed = query.trim();

      if (!trimmed) {
        setRecipes(initialRecipes);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/recipes/search?query=${encodeURIComponent(trimmed)}&number=8`,
        );
        const data = (await res.json()) as { recipes?: SpoonacularRecipe[] };
        setRecipes(data.recipes ?? []);
      } finally {
        setIsLoading(false);
      }
    },
    [initialRecipes],
  );

  return (
    <div className="space-y-6">
      <div className="container mx-auto">
        <SearchBar
          showSubmitButton
          submitButtonLabel="Search"
          ariaLabel="Search recipes"
          debounceMs={300}
          onSubmit={searchRecipes}
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            image={recipe.image}
            title={recipe.title}
            summary={recipe.summary}
            cuisines={recipe.cuisines}
            readyInMinutes={recipe.readyInMinutes}
            prepMinutes={recipe.preparationMinutes}
            cookMinutes={recipe.cookingMinutes}
            servings={recipe.servings}
          >
            {recipe.image ? (
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={100}
                height={100}
              />
            ) : null}
          </RecipeCard>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">Searching...</div>
      ) : null}
    </div>
  );
}
