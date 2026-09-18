/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: "#6E121C",
          light: "#9B2430",
        },
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#F0D56A",
          dark: "#3D2A0A",
        },
        ivory: "#F7F0DC",
        cream: "#FBF6E8",
        parchment: "#F3E6C4",
        ink: "#1A0E0C",
        stone: "#6B655C",
        muted: "#5C5348",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", '"Times New Roman"', "serif"],
        sans: ['"Source Sans 3"', "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(110, 18, 28, 0.45)",
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};
