export default {
  plugins: [
    'prettier-plugin-organize-imports',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-attributes',
  ],
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'lf',
  // Disable removal of unused imports by default (set to false to enable removal)
  organizeImportsSkipDestructiveCodeActions: true,
  // Vue directives should come first
  attributeGroups: ['^v-', '^:', '^@', '^class$', '^id$', '$DEFAULT'],
}
