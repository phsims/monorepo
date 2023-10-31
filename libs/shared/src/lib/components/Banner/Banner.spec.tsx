import { render } from '@testing-library/react';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import Banner from './Banner';


describe('Banner', () => {
  it('should render successfully', () => {
    mockAllIsIntersecting(true);
    const { baseElement } = render(<Banner />);
    expect(baseElement).toMatchSnapshot();
  });
});
