import type { Meta, StoryObj } from '@storybook/react';

import { Button } from 'components/react/atoms/button/button';

import { Header, type HeaderProps } from './header';

const meta: Meta<HeaderProps> = {
  title: 'React/Organisms/Header',
  component: Header,
};

export default meta;

type Story = StoryObj<HeaderProps>;

const defaultNav = [
  { label: 'Recipes', href: '/recipes' },
  { label: 'Collections', href: '/collections' },
  { label: 'Meal Planner', href: '/planner' },
];

export const Default: Story = {
  args: {
    brand: (
      <a href="/" className="text-lg font-semibold text-primary">
        Cookbook
      </a>
    ),
    navLinks: defaultNav,
    actions: <Button variant="primary" title="Sign in" ariaLabel="Sign in" />,
  },
};

export const StickyWithSecondaryAction: Story = {
  args: {
    sticky: true,
    brand: (
      <a href="/" className="text-lg font-semibold text-primary">
        Cookbook
      </a>
    ),
    navLinks: defaultNav,
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" title="Sign in" ariaLabel="Sign in" />
        <Button
          variant="secondary"
          title="Create recipe"
          ariaLabel="Create recipe"
        />
      </div>
    ),
  },
};
