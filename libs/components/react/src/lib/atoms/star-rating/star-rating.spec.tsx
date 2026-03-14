import { fireEvent, render, screen } from '@testing-library/react';

import { StarRating } from './star-rating';

describe('StarRating', () => {
  it('should render read-only rating', () => {
    render(<StarRating rating={3.5} />);

    expect(
      screen.getByRole('img', { name: /rating 3\.5 out of 5/i }),
    ).toBeTruthy();
  });

  it('should round rating to nearest 0.5 for display', () => {
    render(<StarRating rating={3.2} />);

    expect(
      screen.getByRole('img', { name: /rating 3 out of 5/i }),
    ).toBeTruthy();
  });

  it('should support custom maxRating', () => {
    render(<StarRating rating={2} maxRating={10} />);

    expect(
      screen.getByRole('img', { name: /rating 2 out of 10/i }),
    ).toBeTruthy();
  });

  it('should support custom aria-label', () => {
    render(<StarRating rating={4} aria-label="Recipe rating" />);

    expect(screen.getByRole('img', { name: /recipe rating/i })).toBeTruthy();
  });

  it('should render interactive stars when readOnly is false', () => {
    render(
      <StarRating rating={2} readOnly={false} onRatingChange={jest.fn()} />,
    );

    expect(
      screen.getByRole('radiogroup', { name: /rating 2 out of 5/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: /set rating to 0\.5 out of 5/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole('radio', { name: /set rating to 5 out of 5/i }),
    ).toBeTruthy();
  });

  it('should call onRatingChange when a segment is clicked', () => {
    const onRatingChange = jest.fn();

    render(
      <StarRating
        rating={0}
        readOnly={false}
        onRatingChange={onRatingChange}
      />,
    );

    fireEvent.click(
      screen.getByRole('radio', { name: /set rating to 3\.5 out of 5/i }),
    );

    expect(onRatingChange).toHaveBeenCalledWith(3.5);
  });

  it('should clamp rating to maxRating', () => {
    render(<StarRating rating={10} maxRating={5} />);

    expect(
      screen.getByRole('img', { name: /rating 5 out of 5/i }),
    ).toBeTruthy();
  });
});
