import { fireEvent, render, screen } from '@testing-library/react';

import { PricingCard } from './pricing-card';

describe('PricingCard', () => {
  it('should render tier name as heading', () => {
    render(
      <PricingCard
        tierName="Pro"
        price="$29"
        features={['Feature A']}
        ctaLabel="Choose Pro"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Pro' })).toBeTruthy();
  });

  it('should render price and default suffix', () => {
    render(
      <PricingCard
        tierName="Starter"
        price="$9"
        features={[]}
        ctaLabel="Start"
      />,
    );

    expect(screen.getByText('$9')).toBeTruthy();
    expect(screen.getByText('per month')).toBeTruthy();
  });

  it('should render features and CTA', () => {
    const onCta = jest.fn();
    render(
      <PricingCard
        tierName="Team"
        price="$49"
        features={['Up to 10 seats', 'SSO']}
        ctaLabel="Contact sales"
        onCtaClick={onCta}
      />,
    );

    expect(screen.getByText('Up to 10 seats')).toBeTruthy();
    expect(screen.getByText('SSO')).toBeTruthy();

    screen.getByRole('button', { name: 'Contact sales' }).click();
    expect(onCta).toHaveBeenCalledTimes(1);
  });

  it('should show popular banner when popular', () => {
    render(
      <PricingCard
        tierName="Pro"
        price="$29"
        features={[]}
        ctaLabel="Go"
        popular
        popularLabel="Best value"
      />,
    );

    expect(screen.getByText('Best value')).toBeTruthy();
  });

  it('should mark excluded features for assistive tech', () => {
    render(
      <PricingCard
        tierName="Basic"
        price="$0"
        features={[
          { label: 'Included item', included: true },
          { label: 'Locked item', included: false },
        ]}
        ctaLabel="Sign up"
      />,
    );

    expect(
      screen.getByRole('listitem', { name: 'Locked item, not included' }),
    ).toBeTruthy();
  });

  it('should expose article semantics', () => {
    render(
      <PricingCard
        tierName="Enterprise"
        price="Custom"
        priceSuffix=""
        features={[]}
        ctaLabel="Talk to us"
      />,
    );

    expect(screen.getByRole('article')).toBeTruthy();
  });

  it('should not call onCtaClick when button not clicked', () => {
    const onCta = jest.fn();
    render(
      <PricingCard
        tierName="Free"
        price="$0"
        features={[]}
        ctaLabel="Join"
        onCtaClick={onCta}
      />,
    );

    fireEvent.click(screen.getByRole('article'));
    expect(onCta).not.toHaveBeenCalled();
  });
});
