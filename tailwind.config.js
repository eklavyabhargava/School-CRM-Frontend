/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        screen: "100vh",
      },
      width: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
