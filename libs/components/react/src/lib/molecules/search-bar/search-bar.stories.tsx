import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { SearchBar, type SearchBarProps } from './search-bar';
import React from 'react';

const meta: Meta<SearchBarProps> = {
  title: 'React/Molecules/SearchBar',
  component: SearchBar,
  argTypes: {
    showMagnifier: { control: 'boolean' },
    showClearButton: { control: 'boolean' },
    showSubmitButton: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    debounceMs: { control: { type: 'number', min: 0, max: 1000, step: 50 } },
  },
};

export default meta;

type Story = StoryObj<SearchBarProps>;

export const Default: Story = {
  args: {
    placeholder: 'Search…',
    ariaLabel: 'Search',
    showMagnifier: true,
    showClearButton: true,
    showSubmitButton: false,
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Recipe search',
    placeholder: 'Search recipes by name or ingredient',
  },
};

export const WithSubmitButton: Story = {
  args: {
    ...Default.args,
    placeholder: 'Search recipes…',
    showSubmitButton: true,
    submitButtonLabel: 'Search',
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    fullWidth: true,
    placeholder: 'Search across all recipes',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const NoMagnifier: Story = {
  args: {
    ...Default.args,
    showMagnifier: false,
    placeholder: 'Search without icon',
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          value={value}
          onChange={setValue}
          placeholder="Controlled search"
          ariaLabel="Controlled search"
        />
        <p className="text-sm text-muted-foreground">
          Current value: &quot;{value || '(empty)'}&quot;
        </p>
      </div>
    );
  },
};
