import { render, screen } from '@testing-library/react';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('should render a textarea', () => {
    render(<Textarea placeholder="Your message" />);

    expect(screen.getByPlaceholderText('Your message')).toBeTruthy();
  });

  it('should render with label', () => {
    render(<Textarea label="Message" id="msg" />);

    expect(screen.getByLabelText('Message')).toBeTruthy();
  });

  it('should render error and set aria-invalid', () => {
    render(<Textarea label="Body" error="Required" id="body" />);

    const el = screen.getByLabelText('Body');
    expect(el.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByText('Required')).toBeTruthy();
  });

  it('should apply fullWidth', () => {
    render(<Textarea placeholder="Wide" fullWidth />);

    const wrapper = screen.getByPlaceholderText('Wide').parentElement;
    expect(wrapper?.className).toContain('w-full');
  });
});
