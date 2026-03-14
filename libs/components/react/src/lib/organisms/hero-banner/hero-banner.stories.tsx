import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../atoms/button/button';

import { HeroBanner, type HeroBannerProps } from './hero-banner';

const meta: Meta<HeroBannerProps> = {
  title: 'React/Organisms/HeroBanner',
  component: HeroBanner,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<HeroBannerProps>;

const defaultLeftContent = (
  <div className="px-4 py-6 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
      Welcome to the design system
    </h1>
    <p className="mt-2 text-lg text-neutral-600">
      Build consistent, accessible UIs with reusable components and tokens.
    </p>
    <div className="mt-6">
      <Button variant="primary" title="Get started" ariaLabel="Get started" />
    </div>
  </div>
);

const defaultRightContent = (
  <div className="flex items-center justify-center px-4 py-6 sm:p-8">
    <div className="h-48 w-full max-w-md rounded-lg bg-neutral-200 flex items-center justify-center text-neutral-500">
      Placeholder for image or media
    </div>
  </div>
);

export const Default: Story = {
  args: {
    leftContent: defaultLeftContent,
    rightContent: defaultRightContent,
    split: '50-50',
    layout: 'contained',
  },
};

export const Split30_70: Story = {
  args: {
    ...Default.args,
    split: '30-70',
    leftContent: (
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Short headline
        </h2>
        <p className="mt-1 text-neutral-600">
          Less width on the left, more space for media on the right.
        </p>
      </div>
    ),
    rightContent: defaultRightContent,
  },
};

export const Split70_30: Story = {
  args: {
    ...Default.args,
    split: '70-30',
    rightContent: (
      <div className="flex items-center justify-center px-4 py-6">
        <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
          CTA
        </div>
      </div>
    ),
  },
};

export const FullWidthWithBackground: Story = {
  args: {
    ...Default.args,
    layout: 'fullWidth',
    background: 'bg-primary',
    leftContent: (
      <div className="px-4 py-8 sm:px-8 text-primary-foreground">
        <h1 className="text-3xl font-bold">Full-width hero</h1>
        <p className="mt-2 text-primary-foreground/90">
          With primary background and contained content.
        </p>
        <Button
          variant="secondary"
          title="Learn more"
          ariaLabel="Learn more"
          className="mt-4"
        />
      </div>
    ),
    rightContent: (
      <div className="bg-primary/80 flex items-center justify-center p-8">
        <span className="text-primary-foreground/80">Media area</span>
      </div>
    ),
  },
};

export const DifferentSideBackgrounds: Story = {
  args: {
    ...Default.args,
    leftBackground: 'bg-neutral-100',
    rightBackground: 'bg-neutral-200',
    leftContent: (
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-xl font-semibold text-neutral-900">
          Left side background
        </h2>
        <p className="mt-1 text-neutral-600">Optional per-side backgrounds.</p>
      </div>
    ),
    rightContent: defaultRightContent,
  },
};
