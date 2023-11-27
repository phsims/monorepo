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

/* The `export const Default` statement is exporting a story configuration object for the default story
of the `Importer` component. */
export const Default = {
  args: {
    inputProps: {
      label: 'URL',
      placeholder: 'Enter recipe URL',
    },
  },
  argTypes: { onClick: { action: 'clicked' } },
};
