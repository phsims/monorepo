import { render } from '@testing-library/react';

import RecipesHomePage from './';

describe('Recipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesHomePage />);
    expect(baseElement).toBeTruthy();
  });
});
