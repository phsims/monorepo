'use client';
import { Fade } from 'react-awesome-reveal';

import Card, { CardProps } from '../Card/Card';

export interface FeaturesProps {
  cardData: Array<CardProps>;
  sectionID?: string;
}

export function Features({ cardData, sectionID = 'features' }: FeaturesProps) {
  return (
    <div className="mx-auto max-w-7xl py-40 px-6" id={sectionID}>
      <div className="text-center mb-14">
        <Fade
          direction={'up'}
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <h3 className="text-primary text-lg font-normal mb-3 ls-51 uppercase">
            Features
          </h3>
        </Fade>
        <Fade
          direction={'up'}
          delay={800}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <p className="text-3xl lg:text-5xl font-semibold text-lightgrey">
            MealPlan Pro is a valuable tool for simplifying meal planning and
            grocery shopping.
          </p>
        </Fade>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32">
        <Fade
          direction={'up'}
          delay={1000}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          {cardData.map((items, i) => {
            const props = {
              imageWrapperClass:
                'flex justify-center absolute  top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] w-full',
              ...items,
            };
            return <Card {...props} key={i} />;
          })}
        </Fade>
      </div>
    </div>
  );
}

export default Features;
