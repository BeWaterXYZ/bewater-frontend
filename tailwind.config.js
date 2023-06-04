/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '4vw',
    },
    extend: {
      colors: {
        night: '#04051B',
        latenight: '#0B0C24',
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
    },
  },
  plugins: [],
}
