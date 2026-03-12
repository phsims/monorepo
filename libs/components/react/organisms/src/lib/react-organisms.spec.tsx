import { render } from '@testing-library/react';

import ReactOrganisms from './react-organisms';

describe('ReactOrganisms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactOrganisms />);
    expect(baseElement).toBeTruthy();
  });
});
