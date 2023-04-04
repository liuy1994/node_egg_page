module.exports = {
  extends: [require.resolve("@umijs/lint/dist/config/eslint")],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
  },
}
