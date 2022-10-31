/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx,css}',
  ],
  theme: {
    screens: {
      sm: { max: '767.95px' },
      lg: '1280px',
    },
    extend: {
      fontFamily: {
        mono: "'Space Mono'",
      },
      colors: {
        bw: {
          fore: 'var(--bw-fr-color)',
          back: 'var(--bw-bg-color)',
        },
      },
      borderRadius: {
        button: 'var(--bw-button-radius)',
      },
      fontSize: {
        h1: 'var(--bw-h1-size)',
        h2: 'var(--bw-h2-size)',
        h3: 'var(--bw-h3-size)',
        h4: 'var(--bw-h4-size)',
        h5: 'var(--bw-h5-size)',
        body: 'var(--bw-body-size)',
        body_small: 'var(--bw-body-small-size)',
        label: 'var(--bw-label-size)',
      },
      fontWeight: {
        h1: 'var(--bw-h1-weight)',
        h2: 'var(--bw-h2-weight)',
        h3: 'var(--bw-h3-weight)',
        h4: 'var(--bw-h4-weight)',
        h5: 'var(--bw-h5-weight)',
        body: 'var(--bw-body-weight)',
        body_small: 'var(--bw-body-small-weight)',
      },
      lineHeight: {
        h1: 'var(--bw-h1-line-height)',
        h2: 'var(--bw-h2-line-height)',
        h3: 'var(--bw-h3-line-height)',
        h4: 'var(--bw-h4-line-height)',
        h5: 'var(--bw-h5-line-height)',
        body: 'var(--bw-body-line-height)',
        body_small: 'var(--bw-body-small-line-height)',
      },
      radius: {
        button: 'var(--bw-button-radius)',
      },
    },
  },
};
