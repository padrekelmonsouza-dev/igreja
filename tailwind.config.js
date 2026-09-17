/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#5a0d18",
          light: "#8d2530",
        },
        gold: {
          DEFAULT: "#caa34a",
          soft: "#efd58a",
          dark: "#1c140d",
        },
        cream: "#fffaf0",
        parchment: "#f6efdf",
        ink: "#151313",
        muted: "#5c5348",
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', "Times", "serif"],
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(90, 13, 24, 0.35)",
      },
    },
  },
  plugins: [],
};
