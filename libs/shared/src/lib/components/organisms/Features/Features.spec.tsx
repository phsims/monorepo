import { render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import Features, { FeatureProps } from './Features';

const cardData: Array<FeatureProps> = [
  {
    image: '/images/Features/featureOne.svg',
    heading: 'Customized Meal Plans',
    subheading: 'Customize meal plans to fit your diet and goals.',
    link: 'Learn more',
  },
  {
    image: '/images/Features/featureThree.svg',
    heading: 'Recipe Database',
    subheading: 'Access a variety of recipes for easy meal planning.',
    link: 'Learn more',
  },
];

describe('Features', () => {
  it('should render successfully', () => {
    mockAllIsIntersecting(true);
    const { baseElement } = render(<Features cardData={cardData} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    mockAllIsIntersecting(true);
    const { baseElement } = render(<Features cardData={cardData} />);
    expect(baseElement).toMatchSnapshot();
  });
});
