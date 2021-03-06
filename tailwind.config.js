// tailwind.config.js
//
//

const range = (length) => Array.from(Array(length).keys())

const grid = (columns) =>
  range(columns).reduce(
    (acc, i) => ({
      ...acc,
      [`${i + 1}/${columns}`]: `${((i + 1) / columns) * 100}%`,
    }),
    {}
  )

const width = {
  auto: 'auto',
  full: '100%',
  screen: '100vw',
  ...grid(2),
  ...grid(6),
  ...grid(8),
  ...grid(16),
}

const spacing = range(31).reduce(
  (acc, step) => ({
    ...acc,
    [step]: `${step * 4}px`,
  }),
  {}
)

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mobile: { max: '750px' },
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      grey: '#6D6E71',
      purple: '#B456FF',
      green: '#0AA753',
      transparent: 'rgba(0,0,0,0)',
      darkGrey: '#231F20',
      lightGrey: '#BBBDBF',
      altGrey: '#7F7F7F',
    },
    spacing,
    opacity: {
      0: '0',
      20: '.2',
      25: '.25',
      45: '.45',
      50: '.5',
      100: '1',
    },
    width,
    borderWidth: {
      default: '1px',
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
    },
    extend: {
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
    },
  },
  variants: {
    extend: {
      gridColumn: ['last'],
      pointerEvents: ['disabled'],
      textDecoration: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
