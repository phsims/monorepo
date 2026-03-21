import type { Meta, StoryObj } from '@storybook/react';

import { PricingCard, type PricingCardProps } from './pricing-card';

const meta: Meta<PricingCardProps> = {
  title: 'React/Molecules/PricingCard',
  component: PricingCard,
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onCtaClick: { action: 'cta' },
  },
};

export default meta;

type Story = StoryObj<PricingCardProps>;

const starterFeatures = [
  'Up to 3 projects',
  'Community support',
  'Basic analytics',
];

const proFeatures = [
  'Unlimited projects',
  'Priority support',
  'Advanced analytics',
  'Custom domains',
];

const enterpriseFeatures = [
  { label: 'Everything in Pro', included: true },
  { label: 'Dedicated success manager', included: true },
  { label: 'SLA & compliance', included: true },
];

export const Starter: Story = {
  args: {
    tierName: 'Starter',
    description: 'For individuals',
    price: '$9',
    priceSuffix: 'per month',
    features: starterFeatures,
    ctaLabel: 'Start free trial',
    popular: false,
  },
};

export const ProPopular: Story = {
  args: {
    tierName: 'Pro',
    description: 'For growing teams',
    price: '$29',
    priceSuffix: 'per month',
    features: proFeatures,
    ctaLabel: 'Get Pro',
    popular: true,
    popularLabel: 'Most popular',
  },
};

export const Enterprise: Story = {
  args: {
    tierName: 'Enterprise',
    description: 'For large organizations',
    price: 'Custom',
    priceSuffix: '',
    features: enterpriseFeatures,
    ctaLabel: 'Contact sales',
    ctaVariant: 'secondary',
  },
};

export const WithExcludedFeatures: Story = {
  args: {
    tierName: 'Basic',
    description: 'Compare tiers',
    price: '$0',
    features: [
      { label: '1 project', included: true },
      { label: 'SSO', included: false },
      { label: 'Audit log', included: false },
    ],
    ctaLabel: 'Current plan',
    ctaVariant: 'ghost',
  },
};
