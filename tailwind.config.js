/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      primary: {
        100: 'rgba(227, 168, 18,0.1)',
        200: 'rgba(227, 168, 18,0.2)',
        300: 'rgba(227, 168, 18,0.3)',
        400: 'rgba(227, 168, 18,0.4)',
        500: 'rgba(227, 168, 18,0.5)',
        600: 'rgba(227, 168, 18,0.6)',
        700: 'rgba(227, 168, 18,0.7)',
        800: 'rgba(227, 168, 18,0.8)',
        900: 'rgba(227, 168, 18,1)',
      },
      secondary: {
        100: 'rgba(0, 0, 78,0.1)',
        200: 'rgba(0, 0, 78,0.2)',
        300: 'rgba(0, 0, 78,0.3)',
        400: 'rgba(0, 0, 78,0.4)',
        500: 'rgba(0, 0, 78,0.5)',
        600: 'rgba(0, 0, 78,0.6)',
        700: 'rgba(0, 0, 78,0.7)',
        800: 'rgba(0, 0, 78,0.8)',
        900: 'rgba(0, 0, 78,1)',
      },
    },
  },
  plugins: [],
}
