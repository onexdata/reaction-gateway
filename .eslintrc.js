module.exports = {
  "plugins": ["jest"],
  "env": {
    "es6": true,
    "node": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-console": [
      "off"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "off"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  }
}
