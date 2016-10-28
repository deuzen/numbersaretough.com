module.exports = {
  'extends': 'airbnb-base',
  'env': {
    'browser': true,
    'es6': true,
  },
  'parserOptions': {
    'sourceType': 'script',
    'ecmaFeatures': {
      'impliedStrict': true,
    },
  },
  'rules': {
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'func-names': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
  },
}
