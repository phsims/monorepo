import { render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import Features, { CardData } from './Features';

const cardData: Array<CardData> = [
  {
    imgSrc: '/images/Features/featureOne.svg',
    heading: "Customized Meal Plans",
    subheading: "Customize meal plans to fit your diet and goals.",
    link: 'Learn more'
  }
]

describe('Features', () => {
  it('should render successfully', () => {
    mockAllIsIntersecting(true);
    const { baseElement } = render(<Features cardData={cardData} />);
    expect(baseElement).toMatchSnapshot();
  });
});
