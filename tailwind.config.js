/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
    './src/styles/**/*.stories.tsx',
    './src/constants/**/*.ts',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', ...fontFamily.sans],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
        tertiary: ['var(--font-tertiary)', ...fontFamily.sans],
      },
      colors: {
        night: '#04051B',
        midnight: '#1E293B',
        day: '#00CCCC',
        danger: '#F43F5E',
        grey: '#64748B',
        placeholder: '#1A1B33',
      },
      opacity: {
        15: '0.15',
      },
      backgroundImage: {
        card: 'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))',
      },
      boxShadow: {
        border: '0px 0px 4px #E4E4E4',
      },
      gridTemplateColumns: {
        300: 'repeat(auto-fit, minmax(300px, 1fr))',
        100: 'repeat(auto-fit, minmax(100px, 1fr))',
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
