/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          ink: '#060816',
          panel: '#0d1326',
          line: '#223155',
          mist: '#8ba2d8',
          glow: '#1ee3cf',
          alert: '#ff5d73',
          amber: '#ffb84d',
          safe: '#2be38c',
          steel: '#101a35',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 80px rgba(30, 227, 207, 0.18)',
        alert: '0 20px 60px rgba(255, 93, 115, 0.24)',
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        pulsegrid: 'pulsegrid 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulsegrid: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

