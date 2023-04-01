/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./src/**/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        1542: "1542px",
      },

      plugins: [],
    },
  },
};
