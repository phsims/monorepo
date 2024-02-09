import { render } from '@testing-library/react';

import EditRecipe from './EditRecipe';

describe('EditRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditRecipe />);
    expect(baseElement).toBeTruthy();
  });
});
