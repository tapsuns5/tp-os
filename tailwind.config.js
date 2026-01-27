import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './services/**/*.{ts,tsx}',
    './types.ts',
    './blogs/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

