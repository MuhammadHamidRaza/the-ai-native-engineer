import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["build/**", ".docusaurus/**", "node_modules/**", "scripts/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "off",
    },
  },
];
