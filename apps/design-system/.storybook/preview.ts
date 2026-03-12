import React from 'react';
import type { Preview } from '@storybook/react';
import {
  cookbookTheme,
  type TailwindThemeMode,
  type TailwindThemePalette,
} from 'themes/tailwind-themes/cookbook';
import '../src/styles.css';

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
    defaultValue: 'default',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'cookbook', title: 'Cookbook' },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const mode = (context.globals.themeMode as TailwindThemeMode) || 'light';
      const themeId = (context.globals.theme as string) || 'default';
      const themeDef =
        themeId === cookbookTheme.id ? cookbookTheme : defaultTheme;
      const tokens: TailwindThemePalette = themeDef.modes[mode];

      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.setAttribute('data-theme', mode);
        root.setAttribute('data-theme-id', themeDef.id);

        root.style.setProperty('--theme-primary-main', tokens.primary.DEFAULT);
        root.style.setProperty('--theme-primary-foreground', tokens.primary.foreground);
        root.style.setProperty('--theme-primary-light', tokens.accent.DEFAULT);
        root.style.setProperty('--theme-primary-light-foreground', tokens.accent.foreground);
        root.style.setProperty('--theme-secondary-main', tokens.secondary.DEFAULT);
        root.style.setProperty(
          '--theme-secondary-foreground',
          tokens.secondary.foreground
        );
        root.style.setProperty('--theme-success-main', tokens.success.DEFAULT);
        root.style.setProperty('--theme-success-foreground', tokens.success.foreground);
        root.style.setProperty('--theme-warning-main', tokens.warning.DEFAULT);
        root.style.setProperty('--theme-warning-foreground', tokens.warning.foreground);
        root.style.setProperty('--theme-danger-main', tokens.danger.DEFAULT);
        root.style.setProperty('--theme-danger-foreground', tokens.danger.foreground);
        root.style.setProperty('--theme-neutral-main', tokens.neutral.DEFAULT);
        root.style.setProperty('--theme-neutral-foreground', tokens.neutral.foreground);
        root.style.setProperty('--theme-background-default', tokens.background.DEFAULT);
        root.style.setProperty('--theme-background-paper', tokens.background.paper);
      }

      return React.createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            backgroundColor: tokens.background.DEFAULT,
          },
        },
        React.createElement(Story, context.args)
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
