/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          slate: '#0B0F12',
          anthracite: '#111827',
        },
        neon: {
          emerald: {
            DEFAULT: '#10B981',
            dark: '#059669',
            light: '#34D399',
          },
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          slate: 'rgba(15, 23, 42, 0.6)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #10B981, 0 0 10px #10B981' },
          '100%': { boxShadow: '0 0 20px #10B981, 0 0 30px #10B981' },
        },
      },
    },
  },
  plugins: [],
}
