/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './option/index.html',
        './option/src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                splatoon1: 'var(--font-family-s1)',
                splatoon2: 'var(--font-family-s2)'
            }
        }
    },
    plugins: []
}
