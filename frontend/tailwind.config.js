/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'brand-primary': '#4f46e5', // Indigo 600
                'brand-secondary': '#818cf8', // Indigo 400
                'brand-dark': '#1e1b4b', // Indigo 950
                'brand-light': '#eef2ff', // Indigo 50
            }
        },
    },
    plugins: [],
}
