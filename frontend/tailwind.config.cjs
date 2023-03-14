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

      ...radixColors.slateDark,
      ...radixColors.indigoDark,
      ...radixColors.amberDark,
      ...radixColors.redDark,
      ...radixColors.greenDark,
    },

    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
