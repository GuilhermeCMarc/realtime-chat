const twColors = require("tailwindcss/colors");
const radixColors = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: twColors.transparent,
      white: twColors.white,
      black: twColors.black,

      ...radixColors.slate,
      ...radixColors.indigo,
      ...radixColors.amber,
      ...radixColors.red,
      ...radixColors.green,
    },

    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
