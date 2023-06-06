// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    amd: true,
  },
  extends: ["prettier", "plugin:prettier/recommended", "eslint:recommended", "plugin:react/recommended"],
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier", "react-hooks"],
  rules: {
    // indent: ["error", 2],
    "no-console": ["error", { allow: ["warn", "error", "tron"] }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/rules-of-hooks": "off",
  },
  globals: {
    JSX: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
