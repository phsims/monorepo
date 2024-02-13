import Head from 'next/head';
function RecipesHomePage() {
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
      </div>
    </>
  );
}

export default RecipesHomePage;
