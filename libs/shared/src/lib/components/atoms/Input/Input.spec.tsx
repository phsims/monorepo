import { render } from '@testing-library/react';

import Input from './Input';
const props = {
  id: 'text-input',
  label: 'input example',
  name: 'input',
};
describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Input {...props} />);
    expect(baseElement).toBeTruthy();
  });

  it('should match snapshot successfully', () => {
    const { baseElement } = render(<Input {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
