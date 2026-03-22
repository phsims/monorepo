import React from 'react';
import { render } from '@testing-library/react';

jest.mock('components/react/organisms/contact-form', () => ({
  ContactForm: function ContactFormMock() {
    return <div data-testid="contact-form-mock" />;
  },
}));

import Page from '../src/app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
