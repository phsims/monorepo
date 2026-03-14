import type { Meta, StoryObj } from '@storybook/react';

import * as React from 'react';

import { HeartIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

import {
  RoundIconButton,
  type RoundIconButtonProps,
} from './round-icon-button';

const meta: Meta<RoundIconButtonProps> = {
  title: 'React/Atoms/RoundIconButton',
  component: RoundIconButton,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<RoundIconButtonProps>;

export const White: Story = {
  args: {
    icon: <HeartIcon className="h-5 w-5" aria-hidden />,
    ariaLabel: 'Add to favorites',
    variant: 'white',
  },
};

export const Primary: Story = {
  args: {
    icon: <HeartIcon className="h-5 w-5" aria-hidden />,
    ariaLabel: 'Add to favorites',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    icon: <PlusIcon className="h-5 w-5" aria-hidden />,
    ariaLabel: 'Add item',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    icon: <TrashIcon className="h-5 w-5" aria-hidden />,
    ariaLabel: 'Delete',
    variant: 'ghost',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <RoundIconButton
        {...args}
        icon={<PlusIcon aria-hidden />}
        ariaLabel="Small"
        size="sm"
      />
      <RoundIconButton
        {...args}
        icon={<PlusIcon aria-hidden />}
        ariaLabel="Medium"
        size="md"
      />
      <RoundIconButton
        {...args}
        icon={<PlusIcon aria-hidden />}
        ariaLabel="Large"
        size="lg"
      />
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    icon: <HeartIcon className="h-5 w-5" aria-hidden />,
    ariaLabel: 'Add to favorites',
    variant: 'primary',
    disabled: true,
  },
};
