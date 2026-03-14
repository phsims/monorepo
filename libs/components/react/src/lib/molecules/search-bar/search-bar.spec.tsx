import { fireEvent, render, screen } from '@testing-library/react';

import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  it('should render with placeholder', () => {
    render(<SearchBar placeholder="Search recipes" />);

    expect(screen.getByPlaceholderText('Search recipes')).toBeTruthy();
    expect(screen.getByRole('search')).toBeTruthy();
    expect(screen.getByRole('searchbox')).toBeTruthy();
  });

  it('should render with visible label', () => {
    render(<SearchBar label="Recipe search" id="search" />);

    expect(screen.getByLabelText('Recipe search')).toBeTruthy();
  });

  it('should use aria-label when no visible label', () => {
    render(<SearchBar aria-label="Search recipes" />);

    const searchbox = screen.getByRole('searchbox');
    expect(searchbox.getAttribute('aria-label')).toBe('Search recipes');
  });

  it('should show clear button when value is not empty', () => {
    render(<SearchBar defaultValue="pasta" />);

    expect(screen.getByRole('button', { name: /clear search/i })).toBeTruthy();
  });

  it('should not show clear button when value is empty', () => {
    render(<SearchBar />);

    expect(screen.queryByRole('button', { name: /clear search/i })).toBeNull();
  });

  it('should clear input when clear button is clicked', () => {
    render(<SearchBar defaultValue="pasta" />);

    const searchbox = screen.getByRole('searchbox');
    expect((searchbox as HTMLInputElement).value).toBe('pasta');

    fireEvent.click(screen.getByRole('button', { name: /clear search/i }));

    expect((searchbox as HTMLInputElement).value).toBe('');
  });

  it('should call onChange when typing (uncontrolled)', () => {
    const onChange = jest.fn();
    render(<SearchBar onChange={onChange} />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'a' },
    });

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('should call onChange when typing (controlled)', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'b' },
    });

    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('should call onSubmit when Enter is pressed', () => {
    const onSubmit = jest.fn();
    render(<SearchBar defaultValue="pizza" onSubmit={onSubmit} />);

    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('pizza');
  });

  it('should call onSubmit when submit button is clicked', () => {
    const onSubmit = jest.fn();
    render(
      <SearchBar
        defaultValue="salad"
        onSubmit={onSubmit}
        showSubmitButton
        submitButtonLabel="Search"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    expect(onSubmit).toHaveBeenCalledWith('salad');
  });

  it('should hide magnifier when showMagnifier is false', () => {
    render(<SearchBar showMagnifier={false} placeholder="Search" />);

    const form = screen.getByRole('search');
    expect(form.querySelector('svg')).toBeNull();
  });

  it('should apply fullWidth class when fullWidth is true', () => {
    render(<SearchBar fullWidth placeholder="Search" />);

    const form = screen.getByRole('search');
    expect(form.className).toContain('w-full');
  });
});
