import type { HTMLAttributes, ReactNode } from 'react';

export type HeroBannerSplit = '50-50' | '30-70' | '70-30';

export type HeroBannerLayout = 'fullWidth' | 'contained';

export type HeroBannerOverlay = 'none' | 'light' | 'dark';

export interface HeroBannerProps extends HTMLAttributes<HTMLElement> {
  /**
   * Content for the left side of the banner (or first on mobile when stacked).
   */
  leftContent: ReactNode;
  /**
   * Content for the right side of the banner (or second on mobile when stacked).
   */
  rightContent: ReactNode;
  /**
   * Split ratio between left and right sides. Defaults to '50-50'.
   */
  split?: HeroBannerSplit;
  /**
   * 'fullWidth' uses full viewport width; 'contained' uses max-width and horizontal padding.
   */
  layout?: HeroBannerLayout;
  /**
   * Optional Tailwind background classes for the entire banner (e.g. 'bg-primary', 'bg-neutral-100').
   */
  background?: string;
  /**
   * Optional Tailwind background classes for the left content area only.
   */
  leftBackground?: string;
  /**
   * Optional Tailwind background classes for the right content area only.
   */
  rightBackground?: string;
  /**
   * Optional background image URL for the entire banner. Applied as inline style.
   */
  backgroundImage?: string;
  /**
   * When true, on small screens content stacks vertically (left on top, right below).
   */
  stackOnMobile?: boolean;
  /**
   * Optional overlay tone displayed over the background image.
   */
  overlay?: HeroBannerOverlay;
}

const splitToGridCols: Record<HeroBannerSplit, string> = {
  '50-50': 'md:grid-cols-[1fr_1fr]',
  '30-70': 'md:grid-cols-[3fr_7fr]',
  '70-30': 'md:grid-cols-[7fr_3fr]',
};

const overlayToClass: Record<Exclude<HeroBannerOverlay, 'none'>, string> = {
  light: 'bg-white/50',
  dark: 'bg-neutral-950/50',
};

/**
 * Flexible Hero/Banner organism with configurable two-sided layout, split ratios,
 * full-width or contained mode, and optional background color or image.
 * Supports generic content on each side and is responsive and accessible.
 */
export function HeroBanner({
  leftContent,
  rightContent,
  split = '50-50',
  layout = 'contained',
  background = '',
  leftBackground = '',
  rightBackground = '',
  backgroundImage,
  stackOnMobile = true,
  className,
  overlay = 'none',
  ...rest
}: HeroBannerProps) {
  const gridColClass = splitToGridCols[split];
  const isContained = layout === 'contained';

  const sectionClasses = [
    'relative isolate w-full',
    background,
    backgroundImage ? 'bg-cover bg-center bg-no-repeat' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClasses = [
    'grid min-h-[200px] w-full gap-0',
    gridColClass,
    stackOnMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2',
    isContained ? 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const sectionStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <section
      className={sectionClasses}
      style={sectionStyle}
      aria-label="Banner"
      {...rest}
    >
      {overlay !== 'none' && (
        <div
          className={[
            'pointer-events-none absolute inset-0 z-0',
            overlayToClass[overlay],
          ].join(' ')}
        />
      )}
      <div className={['relative z-10', wrapperClasses].join(' ')}>
        <div
          className={[
            'flex min-h-[160px] flex-col justify-center',
            leftBackground || 'bg-transparent',
          ].join(' ')}
        >
          {leftContent}
        </div>
        <div
          className={[
            'flex min-h-[160px] flex-col justify-center',
            rightBackground || 'bg-transparent',
          ].join(' ')}
        >
          {rightContent}
        </div>
      </div>
    </section>
  );
}
