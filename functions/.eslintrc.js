module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: [
    'eslint:recommended',
    'google'
  ],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    quotes: ['error', 'double', { allowTemplateLiterals: true }]
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true
      },
      rules: {}
    },
    {
      files: ['Login.jsx'], // Specify the file name or pattern
      rules: {
        'no-alert': 'off' // Disable the 'no-alert' rule for the specified files
      }
    }
  ],
  globals: {
    test: 'readonly',
    expect: 'readonly'
  }
}
