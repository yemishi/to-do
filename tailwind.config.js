/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'litleShadow': 'rgba(28, 28, 28, 0.84)'
      },
      animation: {
        'pulse-slow': 'wiggle 1.5s ease-in-out '
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)', opacity: '0.5', },
          '30%': { transform: 'rotate(2deg)', opacity: '0.4', },
          '60%': { transform: 'rotate(-1deg)', height: '20px', opacity: '1', },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    },
    fontFamily: {
      title: ['Kalam'],
      slab: ['Roboto Slab'],
    },

  },
  plugins: [],
}

