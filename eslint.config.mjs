import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["./node_modules/", "./dist/", "src/types"]), {
    extends: [
        ...nextCoreWebVitals,
        ...nextTypescript,
        ...compat.extends("eslint:recommended"),
        ...compat.extends("plugin:react/recommended"),
        ...compat.extends("plugin:@typescript-eslint/recommended")
    ],

    plugins: {
        react,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    rules: {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-explicit-any": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "off",

        indent: ["off", 2, {
            switchCase: 4,
        }],

        "linebreak-style": ["off", "unix"],
        "no-console": "error",

        "no-unused-vars": ["error", {
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],

        "array-callback-return": "error",
        semi: ["off", "never"],
        "react/no-unescaped-entities": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/no-unknown-property": "off",
        "react/prop-types": "off",
        "no-extra-boolean-cast": "off",
    },
}]);