/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '490px',
      },
      colors: {
        'light-20': '#f2f2f2',
        'light-50': '#f7f7f7',
        'light-100': '#fcfcfc',
        'light-200': '#EBECED',
        'light-500': 'rgba(255, 255, 255, 0.2)',
        'light-600': '#eff1fc',
        'primary-100': '#2949c6',
        'primary-300': '#4066ff',
        'primary-400': '#3353d6',
        'primary-700': '#20399C',
        'primary-gradient':
          'linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%)',
        'secondary-200': '#f2c618',
        'dark-100': '#191f4c',
        'dark-200': 'rgba(0, 0, 0, 0.4)',
        'dark-300': '#435C6F',
        'dark-400': '#2C3D47',
        'dark-500': '#293843',
      },
      backgroundImage: (theme) => ({
        'gradient-blue':
          'linear-gradient(97.05deg, #4066ff 3.76%, #2949c6 100%)',
      }),
    },
  },
  plugins: [],
}
