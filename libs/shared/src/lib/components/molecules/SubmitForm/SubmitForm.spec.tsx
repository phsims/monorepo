import { render } from '@testing-library/react';

import SubmitForm from './SubmitForm';

const props = {
  inputProps: {
    label: 'Submit Form',
  },
};
describe('SubmitForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SubmitForm
        onSubmit={function (data: unknown): void {
          throw new Error('Function not implemented.');
        }}
        {...props}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should should match snapshot', () => {
    const { baseElement } = render(
      <SubmitForm
        onSubmit={function (data: unknown): void {
          throw new Error('Function not implemented.');
        }}
        {...props}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
