import Image from 'next/image';
import { Fade } from "react-awesome-reveal";
import Link from 'next/link';

interface BannerProps {
  sectionID?: string;
}

//TODO: update to dynamic sections
export function Banner({ sectionID = 'banner' }: BannerProps) {
  return (
    <div id={sectionID} className='bg-lightpink'>
      <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
        <div className='grid grid-cols-1 lg:grid-cols-12 space-x-1'>
          <div className='col-span-6 flex flex-col justify-center'>
            <Fade direction={'up'} delay={400} cascade damping={1e-1} triggerOnce={true}>
              <h1 className="text-4xl lg:text-7xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">
                MealPlan Pro:
              </h1>
              <h2 className="text-3xl lg:text-5xl font-semibold mb-5 text-lightgrey md:4px lg:text-start text-center">Your Ultimate Meal Planning Companion!</h2>
            </Fade>
            <Fade direction={'up'} delay={800} cascade damping={1e-1} triggerOnce={true}>
              <p className='text-grey lg:text-lg font-normal mb-10 lg:text-start text-center'>Are you tired of the daily mealtime chaos, juggling between last-minute recipe searches and grocery store rushes? MealPlan Pro is here to simplify your life and make meal planning a breeze. Whether you're a seasoned chef or a kitchen newbie, our app is your key to stress-free meal planning and efficient grocery shopping.</p>
            </Fade>
            <Fade direction={'up'} delay={1000} cascade damping={1e-1} triggerOnce={true}>
              <div className='md:flex align-middle justify-center lg:justify-start'>
                <button className='text-xl w-full md:w-auto font-medium rounded-full text-white py-5 px-6 bg-pink lg:px-14 mr-6'><Link href='#cook-section'>Lets cook</Link></button>
                <button className='flex border w-full md:w-auto mt-5 md:mt-0 border-pink justify-center rounded-full text-xl font-medium items-center py-5 px-10 text-pink hover:text-white hover:bg-pink'><Link href='#about-section'>Explore now</Link></button>
              </div>
            </Fade>
          </div>

          <div className='col-span-6 flex justify-center relative'>
            <div className='flex bg-white p-2 gap-5 items-center bottom-10 left-10 rounded-xl absolute'>
              <Image src={'/images/Banner/pizza.svg'} alt="pizza-image" width={68} height={68} />
              <p className='text-lg font-normal'>More than 500+ <br /> recipes.</p>
            </div>
            <Image src="/images/Banner/banner-image.png" alt="nothing" width={1000} height={805} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
