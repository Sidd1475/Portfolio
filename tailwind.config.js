/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#04040A',
        surface: {
          50: '#141622',
          100: '#10121C',
          200: '#0C0D16',
          300: '#08080F',
          400: '#04040A',
        },
        anthracite: {
          900: '#030307',
          800: '#07080f',
          700: '#0c0e18',
          600: '#131625',
          500: '#1b1f33',
        },
        electric: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#818cf8',
          indigo: '#6366f1',
          accent: '#4f46e5',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(30px)' },
          '100%': { opacity: '0.8', filter: 'blur(50px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "radial-gradient(circle at center, rgba(255, 255, 255, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
