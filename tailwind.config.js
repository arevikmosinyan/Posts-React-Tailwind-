/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "30vw": "30vw",
        "25vw": "25vw",
        "20vw": "20vw",
      },
    },
    screens: {
      sm: "640px",
      //(min-width: 640px)

      md: "768px",
      //(min-width: 768px)

      lg: "1024px",
      //(min-width: 1024px)

      xl: "1280px",
      //(min-width: 1280px)

      "2xl": "1536px",
      // (min-width: 1536px)
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
