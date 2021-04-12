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

module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      './components/**/*.ts',
      './components/**/*.tsx',
      './components/**/*.js',
      './pages/**/*.ts',
      './pages/**/*.tsx',
      './pages/**/*.js',
    ],
    options: {
      safelist: [/^desktop:col-start/, /^desktop:col-span/],
    },
  },
  theme: {
    screens: {
      desktop: { min: '1024px' },
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      red: '#ff2e00',
      grey: '#111111',
      transparent: 'rgba(0,0,0,0)',
    },
    spacing: range(51).reduce(
      (acc, step) => ({
        ...acc,
        [step]: `${(step * 5) / 10}rem`,
      }),
      {}
    ),
    opacity: {
      0: '0',
      20: '.2',
      25: '.25',
      45: '.45',
      50: '.5',
      100: '1',
    },

    width: {
      auto: 'auto',
      '1/2': '50%',
      ...grid(1),
      ...grid(2),
      ...grid(3),
      ...grid(4),
      ...grid(5),
      ...grid(6),
      ...grid(7),
      ...grid(8),
      ...grid(9),
      ...grid(10),
      ...grid(11),
      ...grid(12),
      full: '100%',
      screen: '100vw',
    },

    borderWidth: {
      default: '1px',
      1: '1px',
      0: '0',
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
    },
  },
  plugins: [],
}
