import Layout from '../components/Layout/Layout';
import Banner from '../components/Banner/Banner';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <>
      <Layout title='Welcome to MealPlan Pro: Your Ultimate Meal Planning Companion!'>
        <main>
          <div id="home-section" className='bg-lightpink'>
            <Banner />
          </div>
        </main>
      </Layout>
    </>
  );
}

export default Index;
