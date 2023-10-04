/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [   "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    theme: {
        extend: {
            fontFamily: {
                title: ['Georgia,Times New Roman'],
                montserrat: ['Montserrat'],
            },
            boxShadow: {
                b: '0px 9px 10px -6px   rgb(0 0 0 / 0.05)',
            }
        },
    },
    plugins: [],
}