import { render } from '@testing-library/react';

import RecipesRoutes from './RecipesRoutes';

describe('RecipesRoutes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipesRoutes />);
    expect(baseElement).toBeTruthy();
  });
});
