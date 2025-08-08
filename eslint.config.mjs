import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended", // Enforces standard JS rules as errors
    "plugin:@typescript-eslint/recommended", // TS best practices
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    // You can add, override, or elevate rules here
    rules: {
      // Example: Make unused vars an error
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
      // Add more rules as needed
    },
  },
];

export default eslintConfig;
