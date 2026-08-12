/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#dbe6f1',
          500: '#123B5D',
          600: '#0e304d',
          700: '#0a243c',
          800: '#06192a',
          900: '#030c17',
        },
        teal: {
          50: '#effaf9',
          100: '#cbeee9',
          500: '#168A8A',
          600: '#127373',
          700: '#0e5c5c',
        },
        gold: {
          50: '#fdf9f0',
          100: '#f9eed7',
          500: '#C49A4A',
          600: '#b0873a',
          700: '#946f2c',
        },
        slate: {
          850: '#1E2933',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(18, 59, 93, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(18, 59, 93, 0.14), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
