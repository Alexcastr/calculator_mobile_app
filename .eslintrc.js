module.exports = {
  root: true,
  extends: '@react-native',
  require: [false],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
