import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	...compat.extends("eslint:recommended"),
	{
		plugins: {},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			ecmaVersion: 2020,
			sourceType: "module",
		},

		rules: {
			"react/prop-types": "off",
			"react-native/no-inline-styles": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
];
