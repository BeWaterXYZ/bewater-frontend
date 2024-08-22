/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx,css}",
    "./src/constants/**/*.ts",
  ],
  theme: {
    container: {
      center: true,
      padding: "4vw",
    },
    extend: {
      bgGradientDeg: {
        108: "108deg",
      },
      spacing: {
        30: "7.5rem",
      },
      fontFamily: {
        primary: ["var(--font-primary)", ...fontFamily.sans],
        secondary: ["var(--font-secondary)", ...fontFamily.sans],
      },
      colors: {
        night: "#04051B",
        latenight: "#0B0C24",
        midnight: "#1E293B",
        day: "#00ffff",
        danger: "#F43F5E",
        grey: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        placeholder: "#1A1B33",
      },
      gridTemplateColumns: {
        300: "repeat(auto-fit, minmax(300px, 1fr))",
        100: "repeat(auto-fit, minmax(100px, 1fr))",
      },
      keyframes: {
        ripple: {
          "0%": {
            top: "36px",
            left: "36px",
            width: 0,
            height: 0,
            opacity: 0,
          },
          "4.9%": {
            top: "36px",
            left: "36px",
            width: 0,
            height: 0,
            opacity: 0,
          },
          "5%": {
            top: "36px",
            left: "36px",
            width: "0",
            height: "0",
            opacity: "1",
          },
          "100%": {
            top: 0,
            left: 0,
            width: "72px",
            height: "72px",
            opacity: 0,
          },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "spin-ripple": "ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme("bgGradientDeg", {}), {
            10: "10deg",
            15: "15deg",
            20: "20deg",
            25: "25deg",
            30: "30deg",
            45: "45deg",
            60: "60deg",
            90: "90deg",
            120: "120deg",
            135: "135deg",
          }),
        }
      );
    }),
  ],
};
