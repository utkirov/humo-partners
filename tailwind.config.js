// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'main-bg': '#F4F7FE',
        'accent-orange': '#F3543A',
        'primary-text': '#2B3674',
        'secondary-text': '#A3AED0',
        'border-gray': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Mulish', 'sans-serif'],
      },
    },
  },
  plugins: [],
}