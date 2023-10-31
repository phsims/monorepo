import { render } from '@testing-library/react';

import LoginDialog from './LoginDialog';

describe('LoginDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginDialog />);
    expect(baseElement).toMatchSnapshot();
  });
});
