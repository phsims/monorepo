import { useState } from 'react';

export interface StarRatingProps {
  rating?: number;
  title: string;
}

export function StarRating({ rating = 0, title }: StarRatingProps) {
  const [newRating, setNewRating] = useState(rating);

  const handleClick = (clickedRating: number) => {
    console.log('called', clickedRating);
    setNewRating(
      clickedRating === newRating ? clickedRating - 1 : clickedRating
    );
  };
  const itemName = title.replace(/ +/g, '-');

  return (
    <div className="flex space-x-1" data-testid={`newRating-${itemName}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          data-testid={`${itemName}-${index}`}
          key={index}
          className={`${
            index < newRating ? 'text-yellow-500' : 'text-gray-400'
          } hover:text-yellow-500 focus:outline-none w-5 h-5`}
          onClick={() => handleClick(index + 1)}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
