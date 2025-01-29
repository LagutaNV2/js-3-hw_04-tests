import globals from "globals";
import pluginJs from "@eslint/js";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";

export default [
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin, // Подключаем плагин корректно для Flat Config
    },
    rules: {
      "no-unused-vars": "warn",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off", // Отключаем, если есть проблемы с Webpack alias
      "jest/no-commented-out-tests": "off",
    },
  },
  {
    ignores: ["dist/*"],
  },
  {
    files: ["**/*.test.js"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off",
    },
  },
];
