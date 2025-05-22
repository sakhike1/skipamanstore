/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Syncopate', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float-up': 'floatUp 8s linear infinite',
        'float-down': 'floatDown 8s linear infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(100%) rotate(-90deg)' },
          '100%': { transform: 'translateY(-100%) rotate(-90deg)' },
        },
        floatDown: {
          '0%': { transform: 'translateY(-100%) rotate(90deg)' },
          '100%': { transform: 'translateY(100%) rotate(90deg)' },
        },
      },
    },
  },
  plugins: [],
};