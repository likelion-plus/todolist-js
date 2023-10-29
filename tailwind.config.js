/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/**/*.html", "./client/**/*.js"],
  theme: {
    screens: {
      s: { min: "320px", max: "767px" },
      m: { min: "768px", max: "1279px" },
      l: { min: "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
