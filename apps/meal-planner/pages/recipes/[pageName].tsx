import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function DynamicRecipesWrapper() {
  const { query } = useRouter();
  const { pageName } = query;

  if (!pageName) {
    // Dynamically import the page based on the pageName
    const RecipesHome = dynamic(() =>
      import(`libs/recipes/src/lib/pages`).then((mod) => mod.default || mod)
    );
    return <RecipesHome />;
  }

  if (typeof pageName === 'string') {
    const DynamicPage = dynamic(() =>
      import(`libs/recipes/src/lib/pages/${pageName}`).then(
        (mod) => mod.default || mod
      )
    );

    return <DynamicPage />;
  }

  // Handle the case when pageName is not available or not a string
  return <div>Page not found</div>;
}

export default DynamicRecipesWrapper;
