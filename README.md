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

### HTML Attribute Sorting

Automatically sorts HTML attributes in a consistent order (class, id, data-\*, aria-\*, etc.)

**Before:**

```text
<div id="container" class="card" data-value="123" aria-label="Card">
  <button type="submit" onclick="submit()" class="btn" id="btn">Submit</button>
</div>
```

**After:**

```html
<div class="card" id="container" data-value="123" aria-label="Card">
  <button class="btn" id="btn" type="submit" onclick="submit()">Submit</button>
</div>
```

### Vue Template Support

Handles Vue directives (v-bind, v-on, v-model, etc.) automatically. Vue directives come first.

**Before:**

```text
<template>
  <div id="app" v-if="show" class="app" @click="handleClick" :data="myData">
    <input type="text" v-model="value" class="input" id="userInput" />
  </div>
</template>
```

**After:**

```vue
<template>
  <div v-if="show" :data="myData" @click="handleClick" class="app" id="app">
    <input v-model="value" class="input" id="userInput" type="text" />
  </div>
</template>
```
