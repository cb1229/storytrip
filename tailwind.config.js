/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nfl: {
          navy: '#013369',
          navyDark: '#001C3D',
          navyLight: '#002F5F',
          red: '#D50A0A',
          redDark: '#A00808',
          redLight: '#E63946',
          silver: '#A5ACAF',
          lightGray: '#F0F0F0',
          mediumGray: '#C4CDD5',
          darkGray: '#495057',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
