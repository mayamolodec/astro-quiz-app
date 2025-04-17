import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import"
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
      import: pluginImport,
    },
    extends: ["js/recommended"],
  },
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "off",
      quotes: ["error", "double"],
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "alphabetize": { order: "asc", caseInsensitive: true },
        "newlines-between": "always"
      }],
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" },
        { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
        { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] },
        { "blankLine": "always", "prev": "directive", "next": "*" }
      ],
      "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
      "newline-before-return": "error",
      "lines-between-class-members": ["error", "always"]

    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
