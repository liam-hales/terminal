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
    extend: {
      keyframes: {
        cursor: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'from, to': {
            opacity: 0,
          },
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '50%': {
            opacity: 1,
          },
        },
      },
      animation: {
        cursor: 'cursor 800ms infinite',
      },
    },
  },
};

export default tailwindConfig;
