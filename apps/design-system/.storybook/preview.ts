import React from 'react';
import type { Preview } from '@storybook/react';
import { cookbookTheme, type ThemeMode } from 'themes/cookbook';

// IMPORTANT:
// - Point this import at the CSS file that loads Tailwind's
//   @tailwind base/components/utilities for your design-system stories.
// - If you already have a shared/global Tailwind entry (e.g. in a shared styles lib),
//   update this path to that file.
// import '../src/styles.css';

export const globalTypes = {
  themeMode: {
    name: 'Mode',
    description: 'Light or dark mode',
    defaultValue: 'light',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Shared UI theme',
    defaultValue: 'cookbook',
    toolbar: {
      icon: 'paintbrush',
      items: [{ value: 'cookbook', title: 'Cookbook' }],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = (context.globals.themeMode as ThemeMode) || 'light';
      const themeId = (context.globals.theme as string) || 'cookbook';
      const themeDef = themeId === cookbookTheme.id ? cookbookTheme : cookbookTheme;
      const palette = themeDef.modes[mode];

      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.setAttribute('data-theme', mode);
        root.setAttribute('data-theme-id', themeDef.id);

        root.style.setProperty('--theme-primary-main', palette.primary.main);
        root.style.setProperty('--theme-primary-light', palette.primary.light);
        root.style.setProperty('--theme-primary-dark', palette.primary.dark);

        root.style.setProperty('--theme-secondary-main', palette.secondary.main);
        root.style.setProperty('--theme-secondary-light', palette.secondary.light);
        root.style.setProperty('--theme-secondary-dark', palette.secondary.dark);

        root.style.setProperty('--theme-background-default', palette.background.default);
        root.style.setProperty('--theme-background-paper', palette.background.paper);
      }

      return React.createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            backgroundColor: palette.background.default,
          },
        },
        React.createElement(Story, context.args)
      );
    },
  ],
};

export default preview;
