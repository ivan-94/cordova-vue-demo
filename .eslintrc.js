module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: 'standard',
  env: {
    'browser': true,
    'node': true,
    'es6': true
  },
  plugins: [
    'html',
  ],
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  rules: {
    'arrow-parens': 0,
    'eol-last': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
