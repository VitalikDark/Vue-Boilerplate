/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#232323',
        purple: '#7600A8',
        'light-gray-200': '#9C9C9C',
      },
      fontSize: {
        22: '22px',
        28: '28px',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      spacing: {
        'container-padding': '215px',
      },
      screens: {
        '2xl': '1600px',
      },
    },
  },
  plugins: [],
}





