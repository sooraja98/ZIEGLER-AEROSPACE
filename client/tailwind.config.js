/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#FBFBFB",
          200: "#f4f4f6",
          300: "#b8bcbf",
          400: "#999999",
          500: "#7F7F7F",
          600: "#666666",
          700: "#4C4C4C",
          800: "#333333",
          900: "#191919",
        },
        // Add your custom colors here
        primary: "#FF5733",
        secondary: "#3498db",
        // You can add more colors as needed
      },
    },
  },
  plugins: [],
};
