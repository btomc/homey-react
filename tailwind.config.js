/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'light-20': '#f2f2f2',
        'light-50': '#f7f7f7',
        'light-100': '#fcfcfc',
        'light-500': 'rgba(255, 255, 255, 0.2)',
        'light-600': '#eff1fc',
        'primary-100': '#2949c6',
        'primary-300': '#4066ff',
        'primary-gradient':
          'linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%)',
        'secondary-200': '#f2c618',
        'dark-200': 'rgba(0, 0, 0, 0.4)',
        'dark-300': '#191f4c',
      },
      backgroundImage: (theme) => ({
        'gradient-blue':
          'linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%)',
      }),
    },
  },
  plugins: [],
}
