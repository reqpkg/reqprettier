# ✨ reqprettier

[Prettier](https://prettier.io) with production-ready configuration and automatic import organization for modern JavaScript, TypeScript, CSS, and HTML/Vue projects.

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

### CSS/SCSS/Less

1. Formats CSS consistently
2. Automatically sorts CSS properties in a logical order

This helps maintain consistency across stylesheets and makes code reviews easier by reducing arbitrary differences in property ordering.

### HTML/Vue Attributes

1. Automatically sorts HTML attributes alphabetically
2. Smart sorting for Vue directives:
   - `v-` directives (v-if, v-model, v-show, etc.) appear at the **top**
   - `:` prop bindings (shorthand for v-bind) come after v- directives
   - Regular HTML attributes (class, id, type, etc.) are sorted alphabetically in the **middle**
   - `@` event handlers (shorthand for v-on) appear at the **bottom**

**Before:**
```vue
<div 
  @click="handleClick" 
  class="container" 
  v-if="isVisible" 
  :key="itemId"
  id="app"
  @input="onInput"
  v-model="value"
>
```

**After:**
```vue
<div
  v-if="isVisible"
  v-model="value"
  :key="itemId"
  class="container"
  id="app"
  @click="handleClick"
  @input="onInput"
>
```

This ordering makes Vue components more readable by grouping directives logically and separating them from event handlers.
