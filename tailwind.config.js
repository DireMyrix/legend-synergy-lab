/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        apexDark: "#0F1115",
        apexCard: "#1A1D24",
        apexRed: "#FF2442",
        apexGold: "#FFCC00",
      },
    },
  },
  plugins: [],
};