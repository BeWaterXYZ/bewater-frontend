/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
    './src/features/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        mono: ['Space Mono', ...fontFamily.serif],
        grotesk: ['Space Grotesk', ...fontFamily.sans],
      },
      colors: {
        brand: '#040000',
        highlight: '#0020f4',
        danger: '#EB7E7E',
      },
      backgroundImage: {
        linearWelcome: 'var(--bw-linear-welcome)',
      },

      animation: {
        'spin-ripple': 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;',
      },
      keyframes: {
        ripple: {
          '0%': {
            top: '36px',
            left: '36px',
            width: 0,
            height: 0,
            opacity: 0,
          },
          '4.9%': {
            top: '36px',
            left: '36px',
            width: 0,
            height: 0,
            opacity: 0,
          },
          '5%': {
            top: '36px',
            left: '36px',
            width: '0',
            height: '0',
            opacity: '1',
          },
          '100%': {
            top: 0,
            left: 0,
            width: '72px',
            height: '72px',
            opacity: 0,
          },
        },
      },
    },
  },
};
