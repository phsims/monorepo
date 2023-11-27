import type { Meta } from '@storybook/react';
/* eslint-disable-next-line */
import { Markdown } from '@storybook/blocks';

import ReadMe from './README.md?raw';
import { Importer } from './Importer';

const meta: Meta<typeof Importer> = {
  component: Importer,
  title: '@Recipes/Importer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `<Markdown>${ReadMe}</Markdown>`,
      },
    },
  },
};
export default meta;

export const Default = {
  args: {
    inputProps: {
      label: 'URL',
      placeholder: 'Enter recipe URL',
    },
  },
  argTypes: { onClick: { action: 'clicked' } },
};
