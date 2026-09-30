import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist", ".astro", ".netlify", "cms"] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "error",
      "func-style": ["error", "expression"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  eslintPluginPrettierRecommended,
  {
    files: ["**/*.astro/*.js", "**/*.astro/*.ts"],
    rules: { "prettier/prettier": "off" },
  },
);
