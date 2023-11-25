import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { StarRating, Card } from '@shared';
import { Recipe } from '../../api/schemas';

export function RecipeItem({
  name,
  description,
  rating,
  id,
  image = '/images/placeholder.svg',
}: Recipe) {
  const ratingProps = {
    rating: rating,
    title: name,
  };

  return (
    <Card
      header={
        <div className="w-full h-32 relative overflow-hidden rounded-t-3xl">
          <Image src={image} alt={name} fill style={{ objectFit: 'cover' }} />
        </div>
      }
      body={
        <>
          <h4 className="text-2xl text-black font-semibold mb-2 ">{name}</h4>
          <StarRating {...ratingProps} />
          <p className="grow my-8">
            {description.length > 70
              ? `${description.substring(0, 70)}...`
              : description}
          </p>
        </>
      }
      footer={
        <Link href={`/recipes/${id}`}>
          <p className="text-lg font-medium text-primary px-8 hover-underline">
            View recipe
            <ChevronRightIcon width={20} height={20} />
          </p>
        </Link>
      }
    />
  );
}

export default RecipeItem;
