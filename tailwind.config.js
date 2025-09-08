/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Traffix3.O/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'car-move': 'car-move 8s linear infinite',
        'car-move-reverse': 'car-move-reverse 8s linear infinite',
        'fumes': 'fumes 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'car-move': {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        'car-move-reverse': {
          '0%': { transform: 'translateX(calc(100vw + 100px))' },
          '100%': { transform: 'translateX(-100px)' },
        },
        fumes: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '50%': { opacity: 0.7, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(1.5)' },
        },
      },
    },
  },
  plugins: [],
}