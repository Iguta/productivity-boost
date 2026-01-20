/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d9f0ff',
          200: '#bce5ff',
          300: '#8fd6ff',
          400: '#57c0ff',
          500: '#2aa6ff',
          600: '#1086eb',
          700: '#0b6bc1',
          800: '#0f5a9a',
          900: '#124c7e',
        },
      },
    },
  },
  plugins: [],
}
