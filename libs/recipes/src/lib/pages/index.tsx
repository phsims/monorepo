import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import RecipeItem from '../components/RecipeItem/RecipeItem';
import { Recipe } from '../api/schemas';

export function Recipes() {
  const [allRecipes, setAllRecipes] = useState<Array<Recipe>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/v1/recipes');
        if (!response.ok) {
          setErrorMessage('Network response was not ok.');
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAllRecipes(data);
      } catch (error) {
        setErrorMessage('Something went wrong');
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);
  if (errorMessage) return <p>{errorMessage}</p>;
  return (
    <>
      <Head>
        <title>Recipe Collection</title>
      </Head>
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <h1 className="text-3xl lg:text-5xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
          Recipe Collection
        </h1>

        <p className="text-grey lg:text-lg font-normal mb-10 lg:text-start text-center">
          Explore our diverse range of delectable recipes meticulously curated
          to suit every palate. Our meal planner app offers a comprehensive list
          of gastronomic wonders, from hearty breakfast options to sumptuous
          dinner indulgences. Discover culinary inspiration, nutritional
          information, and step-by-step instructions for each recipe, ensuring a
          seamless meal planning experience. Whether you're seeking quick
          weekday meals or elaborate weekend feasts, our curated collection will
          elevate your cooking journey. Dive into a world of flavors and plan
          your meals effortlessly with our Recipe Collection on the meal planner
          app.
        </p>

        <div className=" w-full py-14">
          <ul className="grid grid-cols-4  gap-4">
            {allRecipes.map((recipe, index) => (
              <li className="h-full flex flex-col">
                <Link
                  key={index}
                  href={`/recipes/${recipe.id}`}
                  className="flex flex-col  border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg  h-full "
                >
                  <RecipeItem {...recipe} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Recipes;
