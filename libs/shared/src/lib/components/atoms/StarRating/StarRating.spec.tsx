import { fireEvent, render } from '@testing-library/react';

import StarRating, { StarRatingProps } from './StarRating';
const props: StarRatingProps = {
  title: 'chicken pie',
};

describe('StarRating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StarRating {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<StarRating {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should use correct IDs', () => {
    const { getByTestId } = render(<StarRating {...props} />);
    const wrapper = getByTestId(`rating-chicken-pie`);
    const star1 = getByTestId('chicken-pie-0');

    expect(wrapper).toBeTruthy();
    expect(star1).toBeTruthy();
  });

  it('should change the rating correctly', () => {
    const { baseElement } = render(<StarRating {...props} />);
    const svgElements = baseElement.querySelectorAll('svg');

    // Check if all SVG elements the default class
    svgElements.forEach((svgElement) => {
      expect(svgElement.getAttribute('class')).toContain('text-gray-400');
    });

    fireEvent.click(svgElements[0]);

    expect(svgElements[0].getAttribute('class')).not.toContain('text-gray-400');
    expect(svgElements[0].getAttribute('class')).toContain('text-yellow-500');
  });
});
