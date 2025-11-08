/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0891b2",
          foreground: "#ffffff"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0f172a"
        },
        border: "#e2e8f0",
        foreground: "#0f172a",
        background: "#f8fafc"
      }
    },
  },
  plugins: [],
}