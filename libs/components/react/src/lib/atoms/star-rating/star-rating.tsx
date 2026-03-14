import type { KeyboardEvent } from 'react';
import { useCallback, useId, useRef } from 'react';

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

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/** Clamp value to nearest 0.5 step in [0, max]. */
function clampToHalfStep(value: number, max: number): number {
  const clamped = Math.max(0, Math.min(max, value));
  return Math.round(clamped * 2) / 2;
}

/** Star path (viewBox 0 0 24 24), centered. */
function StarPath({ className }: { className?: string }) {
  return (
    <path
      className={className}
      d="M12 2l2.5 7.5H22l-6 4.5 2.25 6.75L12 15.5l-6.25 4.25L8 14 2 9.5h7.5L12 2z"
      fill="currentColor"
    />
  );
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
  const sizeClass = sizeClasses[size];
  const groupId = useId();
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
        className={`inline-flex items-center gap-0.5 text-warning ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 24"
          className={sizeClass}
          aria-hidden
        >
          <defs>
            <clipPath id={`${groupId}-left`}>
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
            <clipPath id={`${groupId}-right`}>
              <rect x="12" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          {Array.from({ length: starCount }, (_, i) => {
            const fill = getStarFill(i);
            const x = i * 24;
            return (
              <g key={i} transform={`translate(${x}, 0)`}>
                {fill === 'full' && <StarPath className="text-warning" />}
                {fill === 'half' && (
                  <>
                    <StarPath className="text-warning/30" />
                    <g clipPath={`url(#${groupId}-left)`}>
                      <StarPath className="text-warning" />
                    </g>
                  </>
                )}
                {fill === 'empty' && <StarPath className="text-warning/30" />}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  const segmentCount = starCount * 2;
  return (
    <div
      role="radiogroup"
      aria-label={groupAriaLabel}
      className={`inline-flex items-center gap-0.5 text-warning ${className}`}
    >
      {Array.from({ length: segmentCount }, (_, segmentIndex) => {
        const value = (segmentIndex + 1) * 0.5;
        const isFilled = displayRating >= value;
        const isChecked = displayRating === value;
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
            className="inline-flex items-center justify-center p-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={sizeClass}
              aria-hidden
            >
              <defs>
                <clipPath id={`${groupId}-btn-left-${segmentIndex}`}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
                <clipPath id={`${groupId}-btn-right-${segmentIndex}`}>
                  <rect x="12" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              {segmentIndex % 2 === 0 ? (
                <>
                  <g clipPath={`url(#${groupId}-btn-left-${segmentIndex})`}>
                    <StarPath
                      className={isFilled ? 'text-warning' : 'text-warning/30'}
                    />
                  </g>
                  <StarPath className="text-warning/30" />
                </>
              ) : (
                <>
                  <StarPath className="text-warning/30" />
                  <g clipPath={`url(#${groupId}-btn-right-${segmentIndex})`}>
                    <StarPath
                      className={isFilled ? 'text-warning' : 'text-warning/30'}
                    />
                  </g>
                </>
              )}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
