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
  // HTML attribute sorting: v- attributes at top, @ attributes at bottom
  attributeGroups: [
    '^v-',        // Vue directives (v-if, v-model, v-bind, etc.) at the top
    '^:',         // Vue :prop shorthand (after v- directives)
    '$DEFAULT',   // Regular HTML attributes in the middle
    '^@',         // Vue @ event handlers at the bottom
  ],
  attributeSort: 'ASC',
}
