import type { HTMLAttributes } from 'react';
import { useId } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Button } from '../../atoms/button/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../atoms/card/card';

export type PricingFeature =
  | string
  | {
      label: string;
      /** When false, feature is shown as unavailable (strikethrough + X icon). Default true. */
      included?: boolean;
    };

function normalizeFeature(feature: PricingFeature): {
  label: string;
  included: boolean;
} {
  if (typeof feature === 'string') {
    return { label: feature, included: true };
  }
  return { label: feature.label, included: feature.included !== false };
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface PricingCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Plan / tier name shown as the card heading */
  tierName: string;
  /** Optional short line under the tier name */
  description?: string;
  /** Display price, e.g. "$29" or "Custom" */
  price: string;
  /** Shown next to the price, e.g. "per month" */
  priceSuffix?: string;
  /** Bullet list of features; strings are treated as included */
  features: PricingFeature[];
  /** Primary action label */
  ctaLabel: string;
  onCtaClick?: () => void;
  /** Highlights the tier with a banner, emphasis ring, and default primary CTA */
  popular?: boolean;
  /** Text on the popular banner (visible and announced) */
  popularLabel?: string;
  /** Overrides automatic CTA style (popular defaults to primary, otherwise secondary) */
  ctaVariant?: ButtonVariant;
}

/**
 * Pricing tier card: tier name, price, feature checklist, and CTA.
 * Uses design-system Card and Button; responsive padding and clear focus states.
 */
export function PricingCard({
  tierName,
  description,
  price,
  priceSuffix = 'per month',
  features,
  ctaLabel,
  onCtaClick,
  popular = false,
  popularLabel = 'Most popular',
  ctaVariant,
  className = '',
  ...rest
}: PricingCardProps) {
  const headingId = useId();
  const featureListId = useId();

  const resolvedCtaVariant: ButtonVariant =
    ctaVariant ?? (popular ? 'primary' : 'secondary');

  const cardVariant = popular ? 'elevated' : 'outlined';

  const rootClasses = [
    'relative flex h-full w-full max-w-sm flex-col',
    popular ? 'ring-2 ring-primary shadow-md' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Card
      variant={cardVariant}
      className={rootClasses}
      role="article"
      aria-labelledby={headingId}
      {...rest}
    >
      {popular && (
        <div className="rounded-t-[inherit] bg-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-primary-foreground">
          {popularLabel}
        </div>
      )}

      <CardHeader
        className={[
          'flex flex-col gap-1 px-6 text-center',
          popular ? 'pt-4' : 'pt-6',
        ].join(' ')}
      >
        <h3
          id={headingId}
          className="text-xl font-semibold leading-tight text-foreground"
        >
          {tierName}
        </h3>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6 px-6 pb-2 pt-2">
        <div className="text-center">
          <p className="flex flex-wrap items-baseline justify-center gap-x-1 gap-y-0">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {price}
            </span>
            {priceSuffix ? (
              <span className="text-sm text-muted-foreground">
                {priceSuffix}
              </span>
            ) : null}
          </p>
        </div>

        <ul
          id={featureListId}
          className="flex flex-1 flex-col gap-3 text-left text-sm"
          aria-label={`${tierName} features`}
        >
          {features.map((feature, index) => {
            const { label, included } = normalizeFeature(feature);
            return (
              <li
                key={`${label}-${index}`}
                className="flex gap-3"
                {...(!included
                  ? { 'aria-label': `${label}, not included` }
                  : {})}
              >
                <span className="mt-0.5 shrink-0" aria-hidden>
                  {included ? (
                    <CheckIcon className="h-5 w-5 text-secondary" />
                  ) : (
                    <XMarkIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </span>
                <span
                  className={
                    included
                      ? 'text-foreground'
                      : 'text-muted-foreground line-through'
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </CardContent>

      <CardFooter className="border-t border-border px-6 pb-6 pt-4">
        <Button
          title={ctaLabel}
          variant={resolvedCtaVariant}
          fullWidth
          onClick={onCtaClick}
          aria-describedby={featureListId}
        />
      </CardFooter>
    </Card>
  );
}
