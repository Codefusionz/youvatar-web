module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3949ab',
        primaryLight: '#d9d9ff',
        primaryLighter: '#d3daff',
        secondary: '#9fa8df',
        tertiary: '#F2F2F2',
        muted: '#888888',
        pink: '#9E5CF2',
        submitted: '#4EAF51',
        greenLight: '#E1FFEC',
        green: "#00ca47"
      },
      minWidth: {
        76: '4.75rem', // 76px
        '2/3': '66.666667%',
        '1/3': '33.333333%',
        '1/2': '50%',
      },
      width: {
        450: '28.125rem', // 450px
        750: '48.875rem', // 750px
      },
      height: {
        500: '31.25rem', // 524px
        450: '28.125rem', // 450px
      },
      minHeight: {
        76: '4.75rem', // 76px
        450: '28.125rem', // 450px
      },
      maxHeight: {
        450: '28.125rem', // 450px
        500: '31.25rem', // 524px
      },
      maxWidth: {
        '1/2': '50%', // 50%
      },
      borderRadius: {
        32: '2rem', // 32 px
      },
      screens: {
        xs: '450px',
      },
      zIndex: {
        100: '100',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
