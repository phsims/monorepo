import { render } from '@testing-library/react';

import ReactAtoms from './react-atoms';

describe('ReactAtoms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactAtoms />);
    expect(baseElement).toBeTruthy();
  });
});
