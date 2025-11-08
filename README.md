# ✨ reqprettier

[Prettier](https://prettier.io) with production-ready configuration and automatic import organization for modern JavaScript and TypeScript projects.

## 🆕 What's New in v2.0

- ⬆️ **Upgraded to Prettier 3.3.3** - Latest stable version
- 🔄 **New import organizer** - Switched to `prettier-plugin-organize-imports` (uses TypeScript's built-in organizer)
- 🧹 **Auto-cleanup** - Automatically removes unused imports (configurable)
- ⚙️ **Configurable import removal** - Use `organizeImportsSkipDestructiveCodeActions` to control unused import removal
- 🏷️ **Better TypeScript support** - Proper handling of `type` imports
- 🎯 **Modern defaults** - Updated configuration for 2025 best practices
  - `trailingComma: 'all'` - Better git diffs
  - `arrowParens: 'always'` - TypeScript compatibility
  - `endOfLine: 'lf'` - Cross-platform consistency

## 📋 Requirements

- **TypeScript projects**: Requires `tsconfig.json` in your project root
- **JavaScript projects**: Works with `allowJs: true` in tsconfig
- **Node.js**: v16 or higher recommended

- [✨ reqprettier](#-reqprettier)
  - [How to use](#how-to-use)
    - [Dependency installation](#dependency-installation)
    - [Enabling the configuration](#enabling-the-configuration)
      - [1) Via `package.json`.](#1-via-packagejson)
      - [2) Or you can customise the configuration](#2-or-you-can-customise-the-configuration)
  - [Examples](#examples)
    - [Javascript](#javascript)

## How to use

You need to install the `reqprettier` package and make it clear that you need to use this config.

### Dependency installation

```bash
npm install reqprettier -D # or another package manager
```

### Enabling the configuration

There are 2 options offered here:

#### 1) Via `package.json`.

In the `package.json` file, add:

```jsonc
{
  // ...
  "prettier": "reqprettier",
  // ...
}
```

#### 2) Or you can customise the configuration

The default import of the `reqprettier` package returns a config. It can be simply installed or extended.

```js
import reqprettierConfig from 'reqprettier'

export default {
  ...reqprettierConfig,
  singleQuote: false,
  // Disable unused imports removal during development
  organizeImportsSkipDestructiveCodeActions: true,
}
```

## Features

- **Automatic code formatting** with sensible defaults
- **Automatic import organization** using TypeScript's built-in organizer
- **Removes unused imports** automatically
- **Modern Prettier 3.x** configuration
- **Production-ready settings** for 2025 and beyond

## ⚙️ Configuration Options

### `organizeImportsSkipDestructiveCodeActions`

**Type:** `boolean` (default: `false`)

Controls whether unused imports are automatically removed.

- **`false` (default)** - Removes unused imports automatically (recommended for production)
- **`true`** - Only sorts imports, keeps unused ones (useful during active development)

**Why this matters:** During development, you often add imports before using them. Auto-removal can be disruptive. Enable this flag while coding, disable for production/CI.

**Example:**

```js
import reqprettierConfig from 'reqprettier'

export default {
  ...reqprettierConfig,
  // Enable during development to prevent import removal
  organizeImportsSkipDestructiveCodeActions: true,
}
```

### Ignore Files

To skip formatting for specific files, add a comment at the top:

```js
// organize-imports-ignore
```

or

```js
// tslint:disable:ordered-imports
```

## Examples

### Javascript/TypeScript

**What it does:**

1. ✨ Formats code consistently
2. 📦 Organizes and sorts imports automatically (alphabetically)
3. 🧹 Removes unused imports
4. 🏷️ Properly handles TypeScript `type` imports
5. 🎯 Groups imports intelligently

**Check out examples:**

- [JavaScript example](./examples/javascript.js)
- [TypeScript example](./examples/typescript.tsx)

<table width="100%">
  <thead>
    <th width="30%">Before</th>
    <th width="50%">After</th>
  </thead>
  <tbody>
    <td>
      <img src="https://raw.githubusercontent.com/reqpkg/reqprettier/main/images/javascript-before.png" />
    </td>
    <td>
      <img src="https://raw.githubusercontent.com/reqpkg/reqprettier/main/images/javascript-after.png" />
    </td>
  </tbody>
</table>
