import Image from 'next/image';
import { StarRating } from '@shared';
import { Recipe } from '../../api/schemas';
import Link from 'next/link';

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
    <div className="card-b pb-8 pb-8 relative rounded-3xl">
      <div className="w-full h-32 relative overflow-hidden ">
        <Image src={image} alt={name} fill style={{ objectFit: 'cover' }} />
      </div>

      <div className="p-2">
        <h4 className="text-2xl text-black font-semibold  mt-8">{name}</h4>
        <StarRating {...ratingProps} />
        <p className="grow my-8">
          {description.length > 70
            ? `${description.substring(0, 70)}...`
            : description}
        </p>

        <Link
          href={`/recipes/${id}`}
          className="text-center text-lg font-medium text-primary mt-2 hover-underline"
        >
          View recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeItem;
