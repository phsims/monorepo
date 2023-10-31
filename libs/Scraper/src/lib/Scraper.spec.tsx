import { render } from '@testing-library/react';

import Scraper from './Scraper';

describe('Scraper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Scraper />);
    expect(baseElement).toBeTruthy();
  });
});
