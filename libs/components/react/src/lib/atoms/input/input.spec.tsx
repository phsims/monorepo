import { render, screen } from '@testing-library/react';

import { Input } from './input';

describe('Input', () => {
  it('should render an input', () => {
    render(<Input placeholder="Enter text" />);

    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('should render with label', () => {
    render(<Input label="Email" id="email" />);

    expect(screen.getByLabelText('Email')).toBeTruthy();
  });

  it('should render hint when provided', () => {
    render(<Input label="Name" hint="Your full name" id="name" />);

    expect(screen.getByText('Your full name')).toBeTruthy();
  });

  it('should render error and set aria-invalid', () => {
    render(<Input label="Field" error="This field is required" id="field" />);

    const input = screen.getByLabelText('Field');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<Input placeholder="Full width" fullWidth />);

    const wrapper = screen.getByPlaceholderText('Full width').parentElement;
    expect(wrapper?.className).toContain('w-full');
  });

  it('should pass through input attributes', () => {
    render(<Input type="email" placeholder="email" disabled />);

    const input = screen.getByPlaceholderText('email');
    expect(input.getAttribute('type')).toBe('email');
    expect((input as HTMLInputElement).disabled).toBe(true);
  });
});
