import * as NextImage from 'next/image';
import { createElement } from 'react';

import '@css/globals.css';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props: any) => {
    const { src } = props;

    const imageProps = {
      ...props,
      unoptimized: true,
      loader: ({ src }: { src: string }) => src,
    };

    return createElement(OriginalNextImage, imageProps);
  },
});
export const parameters = {
  themes: {
    default: 'pink',
    list: [
      { name: 'pink', class: 'pink', color: '#DF6751', default: true },
      { name: 'blue', class: 'blue', color: '#3d5a80' },
    ],
  },
};
