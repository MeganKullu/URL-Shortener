/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
       "cyan":"#2ACFCF",
       "dark-violet":"#3B3054",
       "red":"#F46262",
       "gray":"#BFBFBF",
       "grayish-violet":"#9E9AA7",
       "very-dark-blue":"#35323E",
       "very-dark-violet":"#232127",
      }
    },
  },
  plugins: [],
}

