import { render } from '@testing-library/react';

import RootLayout from './RootLayout';

describe('RootLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RootLayout />);
    expect(baseElement).toBeTruthy();
  });
});
