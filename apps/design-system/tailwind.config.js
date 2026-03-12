const { defaultTailwindExtend } = require('../../themes/tailwind-themes/default');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    '../../libs/components/react/**/src/lib/**/*.{ts,tsx,js,jsx,html}',
    '!./src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '!../../libs/components/react/**/src/lib/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      ...defaultTailwindExtend,
    },
  },
  plugins: [],
};

