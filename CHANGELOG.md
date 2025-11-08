# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-08

### 🎉 Major Update - Production-Ready for 2025

### Changed

- ⬆️ **BREAKING**: Upgraded Prettier from `^3.1.1` to `^3.3.3`
- 🔄 **BREAKING**: Replaced `@trivago/prettier-plugin-sort-imports` with `prettier-plugin-organize-imports`
  - Now uses TypeScript's built-in import organizer
  - Alphabetical sorting instead of custom import order
  - Automatic removal of unused imports
- 📝 **BREAKING**: Updated default configuration:
  - Added `trailingComma: 'all'` for better git diffs
  - Added `arrowParens: 'always'` for TypeScript compatibility
  - Added `endOfLine: 'lf'` for cross-platform consistency
  - Removed custom `importOrder` configuration (uses TypeScript defaults)

### Added

- ✨ Automatic unused import removal
- ⚙️ **`organizeImportsSkipDestructiveCodeActions`** configuration option
  - Control whether unused imports are removed
  - Set to `true` during development to keep unused imports
  - Default: `false` (removes unused imports)
- 🏷️ Better TypeScript `type` import handling
- 📚 TypeScript example file (examples/typescript.tsx)
- 📋 Project requirements documentation
- 📝 CHANGELOG file
- 🚫 Documentation for ignoring files with comments

### Improved

- 📖 Enhanced README with features section
- 🔧 Updated tsconfig.json with `allowJs: true` and `jsx: "react-jsx"`
- 🏷️ Added more npm keywords for better discoverability
- 📦 Updated package description

### Migration Guide

If upgrading from v1.x:

1. Update your dependencies: `npm install reqprettier@2.0.0`
2. Ensure you have a `tsconfig.json` in your project root
3. For JavaScript projects, add `"allowJs": true` to your tsconfig
4. Run formatting to see imports reorganized alphabetically

## [1.0.19] - 2024-XX-XX

### Added

- Initial stable release with `@trivago/prettier-plugin-sort-imports`
- Custom import order configuration
- Basic Prettier formatting defaults
