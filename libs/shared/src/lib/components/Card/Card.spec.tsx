import { render } from '@testing-library/react';

import Card, { CardProps } from './Card';
const props: CardProps = {
  imgSrc: '/images/Features/featureFour.svg',
  heading: 'Nutritional Insights',
  description: 'See key nutritional info for healthier eating.',
  link: 'Learn more',
  imageWrapperClass:
    'flex justify-center absolute  top-[-50%] sm:top-[-40%] md:top-[-55%] lg:top-[-45%] w-full',
};

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<Card {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
