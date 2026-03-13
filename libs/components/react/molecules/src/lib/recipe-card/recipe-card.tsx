import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import React from 'react';

export interface RecipeCardProps extends HTMLAttributes<HTMLElement> {
  imageUrl?: string;
  imageAlt?: string;
  cuisine?: string;
  title: string;
  summary?: string;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  isFavorite?: boolean;
  onFavoriteClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  onDeleteClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const formatMinutes = (minutes?: number) => {
  if (minutes == null) return undefined;
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} hr`;
  return `${hours} hr ${mins} min`;
};

export const RecipeCard: React.FC<RecipeCardProps> = ({
  imageUrl,
  imageAlt,
  cuisine,
  title,
  summary,
  prepTimeMinutes,
  cookTimeMinutes,
  servings,
  isFavorite,
  onFavoriteClick,
  onDeleteClick,
  className = '',
  ...rest
}) => {
  const prep = formatMinutes(prepTimeMinutes);
  const cook = formatMinutes(cookTimeMinutes);

  const total =
    prepTimeMinutes != null || cookTimeMinutes != null
      ? formatMinutes((prepTimeMinutes ?? 0) + (cookTimeMinutes ?? 0))
      : undefined;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background ${className}`}
      {...rest}
    >
      {imageUrl && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
        <header className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            {cuisine && (
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {cuisine}
              </p>
            )}
            <h2 className="text-lg font-semibold leading-snug text-foreground">
              {title}
            </h2>
          </div>

          {(onFavoriteClick || onDeleteClick) && (
            <div className="flex gap-2">
              {onFavoriteClick && (
                <button
                  type="button"
                  aria-pressed={!!isFavorite}
                  aria-label={
                    isFavorite ? 'Unfavorite recipe' : 'Favorite recipe'
                  }
                  onClick={onFavoriteClick}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isFavorite
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                </button>
              )}
              {onDeleteClick && (
                <button
                  type="button"
                  aria-label="Delete recipe"
                  onClick={onDeleteClick}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-destructive/40 bg-card text-destructive transition hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          )}
        </header>

        {summary && (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {summary}
          </p>
        )}

        {(prep || cook || total || servings != null) && (
          <dl className="mt-auto grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-4">
            {prep && (
              <div>
                <dt className="font-medium text-foreground">Prep</dt>
                <dd>{prep}</dd>
              </div>
            )}
            {cook && (
              <div>
                <dt className="font-medium text-foreground">Cook</dt>
                <dd>{cook}</dd>
              </div>
            )}
            {total && (
              <div>
                <dt className="font-medium text-foreground">Total</dt>
                <dd>{total}</dd>
              </div>
            )}
            {servings != null && (
              <div>
                <dt className="font-medium text-foreground">Servings</dt>
                <dd>{servings}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </article>
  );
};

export default RecipeCard;
