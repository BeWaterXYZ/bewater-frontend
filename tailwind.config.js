/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
    './src/styles/**/*.stories.tsx',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', ...fontFamily.sans],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
      },
      colors: {
        // inspiration from  https://colornamer.robertcooper.me/
        night: '#04051B',
        day: '#00CCCC',
        dream: '#2F3153',
        titanium: '#E4E4E4',
        ibis: '#24254E',
        danger: '#EB7E7E',
        grey: '#64748B',
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
