import { render } from '@testing-library/react';

import Recipes from './[pageName]';

describe('Recipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Recipes />);
    expect(baseElement).toBeTruthy();
  });
});
