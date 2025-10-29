import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default createConfigForNuxt({
  features: {
    stylistic: false, // Let prettier handle this
    formatters: true
  }
}).append(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue', '**/*.js', '**/*.jsx'],
    plugins: {
      prettier
    },
    rules: {
      /* ==========
       * General Rules
       * ========== */
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      /* ==========
       * Vue Rules
       * ========== */
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',

      // 👇 jumlah atribut per baris
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 3 },
          multiline: { max: 1 }
        }
      ],

      // 👇 jarak antar block tag (template, script, style)
      'vue/block-tag-newline': [
        'error',
        {
          singleline: 'always',
          multiline: 'always',
          maxEmptyLines: 1
        }
      ],

      // 👇 indentasi di dalam <template>
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
          ignores: []
        }
      ],

      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ],

      /* ==========
       * TypeScript Rules
       * ========== */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',

      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'none',
          arrowParens: 'always',
          endOfLine: 'lf',
          htmlWhitespaceSensitivity: 'ignore',
          bracketSameLine: false,
          printWidth: 100,
          tabWidth: 2
        }
      ]
    }
  },
  prettierConfig
);
