/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff9436", // text-primary, bg-primary
          hover: "#e68530", // text-primary-hover
        },
        secondary: {
          DEFAULT: "#16b0f8",
          hover: "#139de0",
        },
        dark: "#1f2937",
        light: "#f3f4f6",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"], // font-heading
      },
    },
  },
  plugins: [],
};
