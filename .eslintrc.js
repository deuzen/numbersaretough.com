module.exports = {
  'extends': 'airbnb-base',
  'env': {
    'browser': true,
    'es6': true,
  },
  'parserOptions': {
    'sourceType': 'script',
  },
  'rules': {
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'func-names': 'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}]
  },
}
