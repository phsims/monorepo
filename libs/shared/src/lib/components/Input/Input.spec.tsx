import { render } from '@testing-library/react';

import Input from './Input';
const props = {
  id: 'text-input',
  lable: 'input example',
  name: 'input',
  placeholder: 'text input example',
};
describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Input {...props} />);
    expect(baseElement).toMatchSnapshot();
  });
});
