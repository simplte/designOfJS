module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order', // CSS property order https://markdotto.com/2011/11/29/css-property-order/
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'no-invalid-double-slash-comments': null,
    'number-leading-zero': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'content', 'include', 'for', 'function', 'return'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local', 'deep', 'mixin'],
      },
    ],
    indentation: 2,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
  },
};
