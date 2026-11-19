/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#05893e",
          600: "#047f39",
          700: "#03642b",
        },
      },
      fontFamily: {
        hind: ["'Hind Siliguri'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazardor: {
          "primary": "#05893e",
          "primary-content": "#f3fbf4",
          "secondary": "#1a9951",
          "accent": "#047f39",
          "neutral": "#1d271f",
          "base-100": "#fafcfa",
          "base-200": "#f0f5f0",
          "base-300": "#e1e8e1",
          "base-content": "#1d271f",
          "info": "#3abff8",
          "success": "#1a9951",
          "warning": "#fbbd23",
          "error": "#d03739",
        },
      },
    ],
  },
};
