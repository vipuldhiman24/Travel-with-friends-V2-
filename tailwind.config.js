/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f47b25",
        "background-light": "#f8f7f5",
        "background-dark": "#221710",
        "surface-light": "#ffffff",
        "surface-dark": "#2d241e",
        "text-main": "#1c130d",
        "text-main-dark": "#f4ece7",
        "text-muted": "#9c6c49",
        "text-muted-dark": "#b08d74",
        "border-light": "#e8d9ce",
        "border-dark": "#4a3b32",
        "text-sec-light": "#9a6c4c",
        "text-sec-dark": "#d4b8a3",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "body": ["Noto Sans", "Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "full": "9999px"
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "background-pan": "backgroundPan 25s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        backgroundPan: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
}
