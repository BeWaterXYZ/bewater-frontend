/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
    './src/constants/**/*.ts',
  ],
  theme: {
    container: {
      center: true,
      padding: '4vw',
    },
    extend: {
      spacing: {
        30: '7.5rem',
      },
      fontFamily: {
        primary: ['var(--font-primary)', ...fontFamily.sans],
        secondary: ['var(--font-secondary)', ...fontFamily.sans],
      },
      colors: {
        night: '#04051B',
        midnight: '#1E293B',
        day: '#00ffff',
        danger: '#F43F5E',
        grey: {
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        placeholder: '#1A1B33',
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
