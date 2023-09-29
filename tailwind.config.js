/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        visibleSwitch: {
          '0%': { display: 'flex', opacity: 0 },
          '20%': { opacity: 1 },
          '75%': { opacity: 1 },
          '100%': { opacity: 0 },
        }
      },
      animation: {
        visibleSwitch: 'visibleSwitch 6s ease-in ',
      },
      height: {
        '135': '40rem',
      },
    },
    fontFamily: {
      title: ['Georgia,Times New Roman'],
      montserrat: ['Montserrat']

    },

  },
  plugins: [],
}