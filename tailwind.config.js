/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['Bebas Neue', 'sans-serif'],
      }
    },
  },
  plugins: [
    require("@xpd/tailwind-3dtransforms")
  ],
}