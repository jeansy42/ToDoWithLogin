/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cusLigthViolet: "#878AF5",
      cusGrayishViolet: "#B0B3FF",
      cusDarkViolet: "#666AF6",
      cusDarkGray: "#31446C",
      cusYellow: "#F5A921",
      cusOrange: "#F4863C",
    },
    boxShadow: {
      cusShadowBox:
        "1px 4px 6px -1px rgb(30 30 30 / 0.1), -1px 2px 4px -2px rgb(30 30 30 / 0.1)",
    },
    extend: {},
  },
  plugins: [],
});
