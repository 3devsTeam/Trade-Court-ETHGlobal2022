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
        // gray: "#C6C6C6",
        green: "#09b25b",
        lightGreen: "#0ee45a",
        purple: "#AE8AEF",
        black: "#0A060A",
        white: "#fff",
        modalOverlay: "#313131",
        lightGray: "#f3f4f6",
        transparent: "transparent",
        yellow: "#F8C011",
        hoverGray: "#fafafb",
      },
      boxShadow: {
        customDark: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
      },
      fontSize: {
        xs: "16px",
        sm: "18px",
        md: "20px",
        lg: "24px",
      },
      gridTemplateColumns: {
        homePage: "0.35fr 1fr",
        offer: "0.5fr minmax(0, 1fr) 0.6fr 0.7fr 0.5fr",
        profileOffer: "0.1fr 0.2fr 0.2fr 0.2fr 0.3fr 0.2fr 0.1fr",
        form: "0.6fr 0.4fr",
        profile: "0.3fr 0.7fr",
      },
    },
  },
  plugins: [],
};
