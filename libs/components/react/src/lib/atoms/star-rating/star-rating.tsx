import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import type { KeyboardEvent } from 'react';
import { useCallback, useRef } from 'react';

export interface StarRatingProps {
  /** Current rating from 0 to maxRating in 0.5 increments. Rounded to nearest 0.5 for display. */
  rating: number;
  /** Maximum rating (default 5). */
  maxRating?: number;
  /** When true, stars are display-only. When false, stars are clickable and keyboard-focusable. */
  readOnly?: boolean;
  /** Called when user selects a new rating (edit mode only). Value is in 0.5 increments from 0.5 to maxRating. */
  onRatingChange?: (rating: number) => void;
  /** Visual size of each star. */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes for the container. */
  className?: string;
  /** Override for the group's aria-label (e.g. "Recipe rating"). Default describes current rating. */
  'aria-label'?: string;
}

/** Size of each star (Heroicons are 24x24). */
const starSizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
};

/** Clamp value to nearest 0.5 step in [0, max]. */
function clampToHalfStep(value: number, max: number): number {
  const clamped = Math.max(0, Math.min(max, value));
  return Math.round(clamped * 2) / 2;
}

/** Compare rating to segment value in half-steps (avoids float drift). Segment value is 0.5, 1, 1.5, ... */
function isSegmentFilled(displayRating: number, segmentValue: number): boolean {
  return Math.round(displayRating * 2) >= Math.round(segmentValue * 2);
}

export function StarRating({
  rating,
  maxRating = 5,
  readOnly = true,
  onRatingChange,
  size = 'md',
  className = '',
  'aria-label': ariaLabelOverride,
}: StarRatingProps) {
  const displayRating = clampToHalfStep(rating, maxRating);
  const starCount = Math.floor(maxRating);
  const starSizeClass = starSizeClasses[size];
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getStarFill = useCallback(
    (starIndex: number): 'full' | 'half' | 'empty' => {
      const value = displayRating - starIndex;
      if (value >= 1) return 'full';
      if (value >= 0.5) return 'half';
      return 'empty';
    },
    [displayRating],
  );

  const handleSegmentClick = useCallback(
    (segmentIndex: number) => {
      const value = (segmentIndex + 1) * 0.5;
      onRatingChange?.(clampToHalfStep(value, maxRating));
    },
    [maxRating, onRatingChange],
  );

  const handleSegmentKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, segmentIndex: number) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (segmentIndex > 0) {
          handleSegmentClick(segmentIndex - 1);
          segmentRefs.current[segmentIndex - 1]?.focus();
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (segmentIndex < starCount * 2 - 1) {
          handleSegmentClick(segmentIndex + 1);
          segmentRefs.current[segmentIndex + 1]?.focus();
        }
      }
    },
    [handleSegmentClick, starCount],
  );

  const defaultAriaLabel = `Rating ${displayRating} out of ${maxRating}`;
  const groupAriaLabel = ariaLabelOverride ?? defaultAriaLabel;

  if (readOnly) {
    return (
      <div
        role="img"
        aria-label={groupAriaLabel}
        className={`inline-flex shrink-0 items-center gap-0.5 text-warning ${className}`}
      >
        {Array.from({ length: starCount }, (_, i) => {
          const fill = getStarFill(i);
          return (
            <span
              key={i}
              className={`relative inline-block shrink-0 ${starSizeClass}`}
              aria-hidden
            >
              {fill === 'full' && (
                <StarIconSolid className={`${starSizeClass} text-warning`} />
              )}
              {fill === 'half' && (
                <>
                  <StarIcon
                    className={`${starSizeClass} text-warning/30`}
                    aria-hidden
                  />
                  <span className="absolute left-0 top-0 h-full w-1/2 overflow-hidden">
                    <StarIconSolid
                      className={`${starSizeClass} text-warning`}
                      aria-hidden
                    />
                  </span>
                </>
              )}
              {fill === 'empty' && (
                <StarIcon
                  className={`${starSizeClass} text-warning/30`}
                  aria-hidden
                />
              )}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={groupAriaLabel}
      className={`inline-flex items-center gap-0.5 text-warning ${className}`}
    >
      {Array.from({ length: starCount }, (_, starIndex) => (
        <span
          key={starIndex}
          className={`inline-flex shrink-0 ${starSizeClass}`}
        >
          {[0, 1].map((half) => {
            const segmentIndex = starIndex * 2 + half;
            const value = (segmentIndex + 1) * 0.5;
            const isFilled = isSegmentFilled(displayRating, value);
            const isChecked = displayRating === value;
            const isLeftHalf = half === 0;
            return (
              <button
                key={segmentIndex}
                ref={(el) => {
                  segmentRefs.current[segmentIndex] = el;
                }}
                type="button"
                role="radio"
                aria-label={`Set rating to ${value} out of ${maxRating}`}
                aria-checked={isChecked}
                onClick={() => handleSegmentClick(segmentIndex)}
                onKeyDown={(e) => handleSegmentKeyDown(e, segmentIndex)}
                className={`flex min-w-0 flex-1 overflow-hidden rounded p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary ${
                  isLeftHalf ? 'justify-start' : 'justify-end'
                }`}
              >
                <span className={`relative shrink-0 ${starSizeClass}`}>
                  <StarIcon
                    className={`${starSizeClass} text-warning/30`}
                    aria-hidden
                  />
                  {isFilled && (
                    <span className="absolute inset-0">
                      <StarIconSolid
                        className={`${starSizeClass} text-warning`}
                        aria-hidden
                      />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </span>
      ))}
    </div>
  );
}
