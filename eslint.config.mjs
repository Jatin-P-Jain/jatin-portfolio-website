import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js"; // <-- Import recommended config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // <-- Pass the recommended config
});

const eslintConfig = [
  js.configs.recommended, // <-- FlatConfig way of including recommended!
  ...compat.extends(
    // You can add more configs here if needed, e.g.:
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    rules: {
      "no-unused-vars": "error",
      // ...other custom rules
    },
  },
];

export default eslintConfig;
