import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function RecipesHomePage() {
  const { query } = useRouter();
  const { pageName } = query;


  if (typeof pageName === 'string') {
    const DynamicPage = dynamic(() =>
      import(`libs/recipes/src/lib/pages/${pageName.toLowerCase()}`).then(
        (mod) => mod.default || mod
      )

    );

    return <DynamicPage />;
  }

  // Handle the case when pageName is not available or not a string
  return <div>Page not found</div>;
}

export default RecipesHomePage;
