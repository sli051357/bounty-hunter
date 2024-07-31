{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  "plugins": ["react", "react-native"],
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "react/prop-types": "off", // Example rule configuration
    "react-native/no-inline-styles": "off"
  }
}