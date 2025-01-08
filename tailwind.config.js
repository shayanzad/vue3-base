/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      primary: {
        100: 'rgba(0, 161, 255,0.1)',
        200: 'rgba(0, 161, 255,0.2)',
        300: 'rgba(0, 161, 255,0.3)',
        400: 'rgba(0, 161, 255,0.4)',
        500: 'rgba(0, 161, 255,0.5)',
        600: 'rgba(0, 161, 255,0.6)',
        700: 'rgba(0, 161, 255,0.7)',
        800: 'rgba(0, 161, 255,0.8)',
        900: 'rgba(0, 161, 255,1)',
      },
      // primary: '#5c6ac4',
      secondary: '#ecc94b',
    },
  },
  plugins: [],
}
