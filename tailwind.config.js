/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFD93D',
      },
      animation: {
        'spin-slow': 'spin 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
      }
    },
  },
  plugins: [],
}
