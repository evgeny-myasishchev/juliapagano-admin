module.exports = {
  "plugins": [
    "mocha"
  ],
  "env" : {
    "mocha" : true
  },
  "rules" : {
    'import/no-extraneous-dependencies': 'off',
    'no-unused-expressions': 'off',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
