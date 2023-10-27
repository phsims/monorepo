import { render } from '@testing-library/react';
import { screen, configure } from '@testing-library/react'

import Features from './Features';
const cardData: CardData[] = [
  {
    imgSrc: '/images/Features/featureOne.svg',
    heading: "feature 1 title",
    subheading: "feature 1 subheading",
    link: 'feature 1 link'
  },
  {
    imgSrc: '/images/Features/featureThree.svg',
    heading: "feature 2title",
    subheading: "feature 2 subheading",
    link: 'feature 2 link'
  },
]

describe('Features', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Features cardData={cardData} />);
    expect(baseElement).toBeTruthy();
  });

  // it('should contain correct data', () => {
  //   render(<Features cardData={cardData} />);
  //   const feature1 = screen.getByTestId("features-1")

  //   expect(feature1).toBeTruthy();
  // });
});
