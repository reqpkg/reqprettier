# ✨ reqprettier

[Prettier](https://prettier.io) with production-ready configuration and automatic import organization for modern JavaScript and TypeScript projects.

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
}
```

## Features

### Import Organization

Automatically organizes and sorts imports in JavaScript and TypeScript files.

### HTML Attribute Sorting

Automatically sorts HTML attributes in a consistent, logical order:

1. `class` - Styling class names
2. `id` - Element identifier
3. `name` - Form element name
4. `data-*` - Data attributes (sorted alphabetically)
5. `src` - Source URL
6. `for` - Label association
7. `type` - Input/button type
8. `href` - Link URL
9. `value` - Input value
10. `title` - Tooltip text
11. `alt` - Alternative text
12. `role` - ARIA role
13. `aria-*` - ARIA attributes (sorted alphabetically)
14. Other attributes (sorted alphabetically)

This works for:

- `.html` files
- `.vue` files (Vue components)
- `.component.html` files (Angular components)

**Example:**

```html
<!-- Before -->
<div class="container" id="main" data-value="123" aria-label="Test" onclick="test()">Content</div>

<!-- After -->
<div class="container" id="main" data-value="123" aria-label="Test" onclick="test()">Content</div>
```

## Examples

### Javascript/TypeScript

1. Formats code consistently
2. Organizes and sorts imports automatically

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
