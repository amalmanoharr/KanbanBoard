/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "mainBackgroundColor":"#1E1E1E",
        "columnBackgroundColor":"#8C8C8C",
      }
    },
  },
  plugins: [],
}

