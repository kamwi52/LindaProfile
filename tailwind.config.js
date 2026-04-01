export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f3f1',
          100: '#d9e1da',
          200: '#c2cfc3',
          300: '#7a8e7f',
          400: '#4a5d52',
          500: '#1B3022', // Expo Green
          600: '#1a2e1f',
          700: '#162a1a',
          800: '#122615',
          900: '#0d1a0e',
        },
        accent: {
          50: '#fffaf0',
          100: '#ffe5c4',
          200: '#ffd699',
          300: '#f5c668',
          400: '#f0b840',
          500: '#E69D25', // Musanza Gold
          600: '#d48d1e',
          700: '#b87318',
          800: '#9c5f13',
          900: '#6d400a',
        },
        danger: {
          50: '#fdf2f2',
          100: '#fde2e4',
          200: '#f5c2c7',
          300: '#f1a3a6',
          400: '#ef808b',
          500: '#D71921', // Marathon Red
          600: '#c41e1e',
          700: '#a61b1b',
          800: '#881717',
          900: '#6f1414',
        },
      },
    },
  },
  plugins: [],
}
