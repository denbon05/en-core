module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@intlify/vue-i18n/recommended',
    'prettier',
  ],
  plugins: ['jest', 'prettier-plugin-prisma'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'import/no-named-as-default': 'off',
    'import/named': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn', // or "error"
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'vue-i18n': {
      localeDir: './locales/*.{ts}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
};
