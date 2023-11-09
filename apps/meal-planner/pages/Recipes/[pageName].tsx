import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

function DynamicPageWrapper() {
  const router = useRouter();
  const { pageName } = router.query;

  if (typeof pageName === 'string') {
    // Dynamically import the page based on the pageName
    const DynamicPage = dynamic(() => import(`libs/recipes/src/lib/pages/${pageName}`));

    return <DynamicPage />;
  }

  // Handle the case when pageName is not available or not a string
  return <div>Page not found</div>;
}

export default DynamicPageWrapper;