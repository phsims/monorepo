import { render } from '@testing-library/react';
import '@testing-library/jest-dom'

import Banner from './Banner';

describe('Banner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Banner />);
    expect(baseElement).toMatchSnapshot();
  });
});
