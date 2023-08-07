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
        'rever': 'rever 1.5s  linear',
        'pulse-slow': 'wiggle 1.5s ease-in-out ',
      },
      keyframes: {
        rever: {
          '50%': { marginLeft: '0' },
          '100%': { marginLeft: '0' }
        },
        wiggle: {


        },
      },

    },
    fontFamily: {
      title: ['Kalam'],
      slab: ['Roboto Slab'],
    },

  },
  plugins: [],
}

