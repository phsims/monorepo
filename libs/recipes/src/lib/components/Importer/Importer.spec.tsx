import { render } from '@testing-library/react';

import Importer from './Importer';

describe('Importer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Importer />);
    expect(baseElement).toBeTruthy();
  });
});
