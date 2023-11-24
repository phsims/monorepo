import Image from 'next/image';
import { StarRating } from '@shared';
import { Recipe } from '../../api/schemas';

export function RecipeItem({ name, description, rating, image }: Recipe) {
  const ratingProps = {
    rating: rating,
    title: name,
  };
  return (
    <div>
      <div className="w-full h-32 relative">
        <Image src={image} alt={name} fill />
      </div>

      <div className="p-8">
        <p className="text-lg text-black-600 capitalize">{name}</p>
        <p className="grow ">
          {description.length > 70
            ? `${description.substring(0, 70)}...`
            : description}
        </p>
        <div>
          <StarRating {...ratingProps} />
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
