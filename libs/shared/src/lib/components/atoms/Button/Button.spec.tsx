import { render } from '@testing-library/react';

import Button from './Button';
const props = {
  text: 'button text',
};
describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { baseElement } = render(<Button {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
