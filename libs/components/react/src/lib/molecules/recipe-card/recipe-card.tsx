import type { HTMLAttributes, ReactNode } from 'react';

import { ClockIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';

import { Card, CardContent, CardHeader } from '../../atoms/card/card';
import { Chip } from '../../atoms/chip/chip';
import { RoundIconButton } from '../../atoms/round-icon-button/round-icon-button';

/**
 * Props for the Recipe Card molecule, aligned with Spoonacular API fields
 * where applicable. All display fields are optional to support partial data.
 */
export interface RecipeCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Recipe image URL */
  image?: string;
  /** Accessible description for the image (defaults to title when not set) */
  imageAlt?: string;
  /** Recipe title, e.g. "Classic Margherita Pizza" */
  title: string;
  /** Short summary or description (plain text; strip HTML before passing if needed) */
  summary?: string;
  /** Cuisine labels, e.g. ["Italian", "Pizza"] */
  cuisine?: string[];
  /** Total ready time in minutes */
  readyInMinutes?: number;
  /** Prep time in minutes (optional, for display) */
  prepMinutes?: number;
  /** Cook time in minutes (optional, for display) */
  cookMinutes?: number;
  /** Number of servings */
  servings?: number;
  /** Called when favorite/save is toggled */
  onFavorite?: () => void;
  /** Called when delete action is clicked */
  onDelete?: () => void;
  /** Whether the recipe is currently favorited/saved */
  isFavorite?: boolean;
  /** Optional class name for the root card */
  className?: string;
  /** Optional node to render instead of default action buttons (e.g. custom actions) */
  actions?: ReactNode;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Recipe Card molecule for CookbookKeeper. Displays recipe image, title,
 * summary, cuisine, times, servings, and action buttons (favorite, delete).
 * Uses design system tokens and is responsive and accessible.
 */
export function RecipeCard({
  image,
  imageAlt,
  title,
  summary,
  cuisine,
  readyInMinutes,
  prepMinutes,
  cookMinutes,
  servings,
  onFavorite,
  onDelete,
  isFavorite = false,
  actions,
  className = '',
  ...rest
}: RecipeCardProps) {
  const imgAlt = imageAlt ?? (title ? `${title} — recipe` : '');
  const summaryText = summary ? stripHtml(summary) : undefined;

  const timeParts: string[] = [];
  if (readyInMinutes != null) timeParts.push(`${readyInMinutes} min`);
  else if (prepMinutes != null || cookMinutes != null) {
    const prep = prepMinutes ?? 0;
    const cook = cookMinutes ?? 0;
    if (prep + cook > 0) timeParts.push(`Prep ${prep} min, Cook ${cook} min`);
  }

  const defaultActions = (
    <div className="flex flex-wrap items-center gap-2">
      {onFavorite != null && (
        <RoundIconButton
          icon={
            isFavorite ? (
              <HeartIconSolid className="h-5 w-5 text-secondary" aria-hidden />
            ) : (
              <HeartIcon className="h-5 w-5" aria-hidden />
            )
          }
          ariaLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          variant="white"
          onClick={onFavorite}
        />
      )}
      {onDelete != null && (
        <RoundIconButton
          icon={<TrashIcon className="h-5 w-5 " aria-hidden />}
          ariaLabel="Delete recipe"
          variant="white"
          onClick={onDelete}
        />
      )}
    </div>
  );

  return (
    <Card
      variant="elevated"
      className={['overflow-hidden', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {image && (
        <div className="group relative h-48 w-full overflow-hidden bg-neutral">
          <img
            src={image}
            alt={imgAlt}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          {(actions != null || onFavorite != null || onDelete != null) && (
            <div className="absolute inset-x-0 top-0 flex justify-end p-3">
              {actions ?? defaultActions}
            </div>
          )}
          {cuisine && cuisine.length > 0 && (
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
              {cuisine.map((c) => (
                <Chip key={c} variant="primary" size="md">
                  {c}
                </Chip>
              ))}
            </div>
          )}
        </div>
      )}

      <CardHeader className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        {summaryText && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {summaryText}
          </p>
        )}
        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {timeParts.length > 0 && (
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Time</dt>
              <dd>{timeParts.join(' • ')}</dd>
            </div>
          )}
          {servings != null && servings > 0 && (
            <div className="flex items-center gap-1">
              <UsersIcon className="h-4 w-4" aria-hidden />
              <dt className="sr-only">Servings</dt>
              <dd>{servings} servings</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
