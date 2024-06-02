import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    ignores: ['temp.js', 'webpack.config.js', 'eslint.config.js'],
  },
];