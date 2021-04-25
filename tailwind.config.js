const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hobbit': 'url("./Images/hobbit.JPG")',
        'kaikoura': 'url("./Images/kaikoura.JPG")',
        'hills': 'url("./Images/hills.JPG")',
        'cloudSmile': 'url("./Images/cloudSmile.JPG")',
        'workPhoto': 'url("./Images/workPhoto.jpg")',
      }),
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '29': '7.25rem',
        '30': '7.5rem',
        '31': '7.75rem',
        '33': '8.25rem',
        '34': '8.5rem',
        '35': '8.75rem',
        '37': '9.25rem',
        '38': '9.5rem',
        '39': '9.75rem',
      },
      transitionDuration: {
       '3000': '3000ms',
       '5000': '5000ms',
      },
    },
    boxShadow: {
      smYellow: '5px -5px yellow',
      mdYellow: '10px -10px yellow',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      teal: colors.teal,
      orange: colors.orange,
      pink: colors.pink,
    },
    scale: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '90': '.9',
    '95': '.95',
    '100': '1',
    '105': '1.05',
    '110': '1.1',
    '125': '1.25',
    '150': '1.5',
    '200': '2',
    '250': '2.5',
    '300': '3',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
