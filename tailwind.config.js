/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hb-green': '#0B4D3B',
        'hb-green-dark': '#062920',
        'hb-green-light': '#136750',
        'hb-lime': '#B7D52D',
        'hb-lime-glow': '#d2ef44',
        'hb-orange': '#FF7A00',
        'hb-orange-glow': '#ff9b3d',
        'hb-cream': '#F8F5EE',
        'hb-dark': '#0a0e0c',
        'hb-surface': '#101613',
        'hb-card': 'rgba(20, 28, 24, 0.75)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-lime': '0 0 35px -5px rgba(183, 213, 45, 0.4)',
        'glow-orange': '0 0 35px -5px rgba(255, 122, 0, 0.45)',
        'glow-green': '0 0 45px -5px rgba(11, 77, 59, 0.6)',
        'pedestal': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(183, 213, 45, 0.15)',
      }
    },
  },
  plugins: [],
};
