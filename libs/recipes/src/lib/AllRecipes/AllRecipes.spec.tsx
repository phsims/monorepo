import { render } from '@testing-library/react';

import AllRecipes from './AllRecipes';

describe('AllRecipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AllRecipes />);
    expect(baseElement).toBeTruthy();
  });
});
