/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        green: '#00ca47',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
