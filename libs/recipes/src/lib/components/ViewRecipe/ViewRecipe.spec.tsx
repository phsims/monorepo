import { render } from '@testing-library/react';

import ViewRecipe from './ViewRecipe';

describe('ViewRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewRecipe />);
    expect(baseElement).toBeTruthy();
  });
});
