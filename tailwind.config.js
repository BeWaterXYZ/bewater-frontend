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
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', ...fontFamily.sans],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
        third: ['var(--font-third)', ...fontFamily.sans],
      },
      colors: {
        night: '#04051B',
        day: '#00CCCC',
        danger: '#F43F5E',
        grey: '#64748B',
        placeholder: '#1A1B33',
      },
      opacity: {
        15: '0.15',
      },
      backgroundImage: {
        hero: 'linear-gradient(232.15deg, #CE6A9C 14.72%, #7949D0 31.61%, #314AE8 67.38%, #36C8FF 84.91%)',
        slogan:
          'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)',
        brief: 'linear-gradient(180deg, #D0B6FF 0%, #284CCD 100%)',
        card: 'linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))',
        social:
          'linear-gradient(232.15deg, #CE6A9C 14.72%, #7949D0 31.61%, #314AE8 67.38%, #36C8FF 84.91%)',
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
