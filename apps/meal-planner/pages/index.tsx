import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';
import Features, { CardData } from '../components/Features/Features';


const cardData: CardData[] = [
  {
    imgSrc: '/images/Features/featureOne.svg',
    heading: "Customized Meal Plans",
    subheading: "Customize meal plans to fit your diet and goals.",
    link: 'Learn more'
  },
  {
    imgSrc: '/images/Features/featureThree.svg',
    heading: "Recipe Database",
    subheading: "Access a variety of recipes for easy meal planning.",
    link: 'Learn more'
  },
  {
    imgSrc: '/images/Features/featureTwo.svg',
    heading: "Smart Shopping Lists",
    subheading: "Generate grocery lists from your plans.",
    link: 'Learn more'
  },
  {
    imgSrc: '/images/Features/featureFour.svg',
    heading: "Nutritional Insights",
    subheading: "See key nutritional info for healthier eating.",
    link: 'Learn more'
  },

]

export function Index() {

  return (
    <>
      <Layout title='Welcome to MealPlan Pro: Your Ultimate Meal Planning Companion!'>
        <main>
          <div id="home-section" className='bg-lightpink'>
            <Banner />
          </div>
          <Features cardData={cardData} />
        </main>
      </Layout>
    </>
  );
}

export default Index;
