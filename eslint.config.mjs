// eslint.config.mjs
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next + TS Basis
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Unsere Ergänzungen
  {
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      // sorgt dafür, dass "@/*" in Imports korrekt aufgelöst wird
      "import/resolver": {
        typescript: { project: path.join(__dirname, "tsconfig.json") },
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      },
    },
    rules: {
      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import-Order
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          pathGroups: [{ pattern: "@/**", group: "internal", position: "after" }],
          "newlines-between": "always",
        },
      ],

      // Unused vars entspannter, aber sauber
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },

    // gleich wie bei dir
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];
