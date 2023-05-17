/**
 * The Tailwind CSS config used to
 * configure Tailwind CSS for the app
 *
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'var(--sans-font)',
      mono: 'var(--mono-font)',
    },
  },
};

export default tailwindConfig;
