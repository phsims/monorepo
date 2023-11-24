import { render } from '@testing-library/react';

import ImportRecipe from './index';

describe('ImportRecipe', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImportRecipe />);
    expect(baseElement).toBeTruthy();
  });
});
