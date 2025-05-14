/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai', 'sans-serif'],
      mono: ['monospace'],
    },
    extend: {
      
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ],
}