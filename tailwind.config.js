/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "30vw": "30vw",
        "20vw": "20vw",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
