module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jest/globals": true
  },
  "extends": [
    "airbnb-base",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "max-classes-per-file": ["error", 3]
  },
  "plugins": ["jest"]
};