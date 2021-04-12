const path = require('path')

module.exports = {
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    'no-shadow': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
  },
  globals: {
    fetch: true,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'standard',
        'standard-jsx',
        'standard-react',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': 2,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
      plugins: ['prettier', '@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: path.join(__dirname, '/tsconfig.json'),
      },
    },
  ],
}
