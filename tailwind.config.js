/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5de9cd',
          400: '#2dd4b4',
          500: '#14b89a',
          600: '#0d9f88',
          700: '#0f766d',
          800: '#115e59',
          900: '#134e4a',
        },
        cocred: {
          mint: '#5DBEA3',
          green: '#4CAF93',
          dark: '#2C5F4F',
        }
      },
    },
  },
  plugins: [],
}
