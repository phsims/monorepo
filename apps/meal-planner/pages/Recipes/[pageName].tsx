import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import RootLayout from '../RootLayout';

function DynamicPageWrapper() {
  const router = useRouter();
  const { pageName } = router.query;

  if (typeof pageName === 'string') {
    // Dynamically import the page based on the pageName
    const DynamicPage = dynamic(
      () => import(`libs/recipes/src/lib/pages/${pageName}`)
    );

    return (
      <RootLayout>
        <DynamicPage />
      </RootLayout>
    );
  }

  // Handle the case when pageName is not available or not a string
  return <div>Page not found</div>;
}

export default DynamicPageWrapper;
