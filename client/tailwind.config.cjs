/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        gray: "#C6C6C6",
        green: "#1DB954",
        lightGreen: "#0ee45a",
        purple: "#AE8AEF",
        black: "#0A060A",
        white: "#fff",
        modalOverlay: "#313131",
        lightGray: "#f3f4f6",
        transparent: "transparent",
        yellow: "#F8C011",
      },
      fontSize: {
        xs: "16px",
        sm: "18px",
        md: "20px",
        lg: "24px",
      },
      fontWeight: {
        sm: 400,
        md: 500,
        bold: 700,
      },
      screens: {
        mobile: { min: "375px", max: "767px" },
        // => @media (min-width: 375px and max-width: 767px) { ... }

        tablet: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        desktop: { min: "1024px" },
        // => @media (min-width: 1024px) { ... }
      },
      gridTemplateColumns: {
        offer: "0.5fr minmax(0, 1fr) 0.6fr 0.7fr 0.5fr",
        form: "0.6fr 0.4fr",
        profile: "0.3fr 0.7fr",
      },
    },
  },
  plugins: [],
};
