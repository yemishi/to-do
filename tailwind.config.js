/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",],

    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                title: ['Georgia,Times New Roman'],
                montserrat: ['Montserrat'],
            },
            boxShadow: {
                b: '0px 9px 10px -6px rgb(0 0 0 / 0.05)',
                '3xl': '5px 20px 50px rgb(0 0 0 / 0.05)'
            },
            colors: {
                water: {
                    200: '#b6e4f5',
                    300: '#80d2f0',
                    400: '#30c1f7',
                    500: '#2398c4',
                    600: '#1d6f8d',
                    700: '#165870',
                    800: '#114355',
                    900: '#0f3a4a',
                    950: '#0c2d39',

                }
            }
        },
    },
    plugins: [],
}