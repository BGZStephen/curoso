module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    createDefaultProgram: true,
  },
  env: { node: true },
  rules: {},
  ignorePatterns: [
    "src/**/*.test.ts",
    "src/test-utils/**/*.ts",
    "coverage/**/*",
    "dist",
  ],
};
