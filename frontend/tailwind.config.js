/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "20px",
      },
      colors: {
        dark_primaty: "#0d0c0f",
        dark_secondary: "#15161a",
      },
    },
  },
  plugins: [],
};
