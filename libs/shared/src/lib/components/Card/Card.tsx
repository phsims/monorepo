import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
/* eslint-disable-next-line */
export interface CardProps {
  imgSrc?: string;
  heading: string;
  description: string;
  link: string;
  imageWrapperClass?: string;
}

export function Card({
  imgSrc,
  heading,
  description,
  link,
  imageWrapperClass = '',
}: CardProps) {
  return (
    <div className="card-b relative rounded-3xl ">
      {imgSrc && (
        <div className={imageWrapperClass}>
          <Image src={imgSrc} alt={imgSrc} width={300} height={300} />
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl text-black font-semibold text-center mt-16">
          {heading}
        </h3>
        <p className="text-lg font-normal text-black text-center text-opacity-50 mt-2">
          {description}
        </p>
        <div className="flex items-center justify-center">
          <Link href="/">
            <p className="text-center text-lg font-medium text-primary mt-2 hover-underline">
              {link}
              <ChevronRightIcon width={20} height={20} />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
