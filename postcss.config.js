module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss',
    'autoprefixer',
    'postcss-flexbugs-fixes',
    ['postcss-preset-env', { stage: 1 }],
  ],
}
