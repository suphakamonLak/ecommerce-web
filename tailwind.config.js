/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans Thai', 'sans-serif'],
      mono: ['monospace'],
      anago: ['MN Anago'],
      kanit: ['Kanit'],
    },
    extend: {
      colors: {
        primary: {
            50: '#faf0f6',
            100: '#f7e4ef',
            200: '#e8bad2',
            300: '#db95b6',
            400: '#c2577d',
            500: '#a52241',
            600: '#961d37',
            700: '#7d1429',
            800: '#630d1d',
            900: '#4a0712',
            950: '#30030a',
            default: '#a52241',
            dark: {
                50: '#fcf7fa',
                100: '#faf2f6',
                200: '#f5dfe8',
                300: '#edccd8',
                400: '#e0abb5',
                500: '#d48a8f',
                600: '#bf7176',
                700: '#9e4d52',
                800: '#803236',
                900: '#5e1b1f',
                950: '#3d0c0e',
                default: '#d48a8f',
              },
            },
      }
    },
  },
  plugins: [
    // require('daisyui'),
    require('flowbite/plugin')
  ],
}