import { render } from '@testing-library/react';

import ReactMolecules from './react-molecules';

describe('ReactMolecules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactMolecules />);
    expect(baseElement).toBeTruthy();
  });
});
