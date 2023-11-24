import { render } from '@testing-library/react';

import RecipesHomePage from './index';

describe('Recipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesHomePage />);
    expect(baseElement).toBeTruthy();
  });
});
