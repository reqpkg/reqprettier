import * as prettier from 'prettier'
import { describe, expect, test } from 'vitest'
import prettierConfig from '../prettier.config.js'

describe('Prettier Formatting', () => {
  test('formats code with correct settings', async () => {
    const input = `const foo={bar:1,baz:2}`
    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
    })

    expect(output).toBe(`const foo = { bar: 1, baz: 2 }\n`)
  })

  test('uses single quotes', async () => {
    const input = `const str = "hello"`
    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
    })

    expect(output).toBe(`const str = 'hello'\n`)
  })

  test('removes semicolons', async () => {
    const input = `const x = 1;`
    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
    })

    expect(output).toBe(`const x = 1\n`)
  })

  test('adds trailing commas', async () => {
    const input = `const obj = {
  a: 1,
  b: 2
}`
    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
    })

    expect(output).toContain('b: 2,')
  })

  test('uses arrow parens always', async () => {
    const input = `const fn = x => x * 2`
    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
    })

    expect(output).toBe(`const fn = (x) => x * 2\n`)
  })
})

describe('Import Sorting', () => {
  test('sorts imports alphabetically', async () => {
    const input = `import { z } from 'z-package'
import { a } from 'a-package'
import { m } from 'm-package'

const x = 1
`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
      filepath: 'test.js',
    })

    const lines = output.split('\n')
    const imports = lines.filter((line) => line.startsWith('import'))

    expect(imports[0]).toContain('a-package')
    expect(imports[1]).toContain('m-package')
    expect(imports[2]).toContain('z-package')
  })

  test('preserves unused imports (organizeImportsSkipDestructiveCodeActions: true)', async () => {
    const input = `import { unused } from 'some-package'
import { used } from 'other-package'

const x = used
`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'babel',
      filepath: 'test.js',
    })

    // Both imports should be present
    expect(output).toContain("from 'some-package'")
    expect(output).toContain("from 'other-package'")
  })
})

describe('TypeScript Support', () => {
  test('handles type imports', async () => {
    const input = `import type { User } from './types'
import { useState } from 'react'

const x = useState()
`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'typescript',
      filepath: 'test.ts',
    })

    expect(output).toContain("import type { User } from './types'")
    expect(output).toContain("import { useState } from 'react'")
  })

  test('formats TypeScript code', async () => {
    const input = `interface User{name:string;age:number}`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'typescript',
      filepath: 'test.ts',
    })

    expect(output).toBe(`interface User {
  name: string
  age: number
}
`)
  })
})

describe('CSS Property Sorting', () => {
  test('sorts CSS properties in correct order', async () => {
    const input = `.example {
  margin: 0;
  display: flex;
  position: relative;
  padding: 10px;
  color: blue;
}`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'css',
      filepath: 'test.css',
    })

    expect(output).toBe(`.example {
  display: flex;
  position: relative;
  margin: 0;
  padding: 10px;
  color: blue;
}
`)
  })

  test('handles SCSS syntax', async () => {
    const input = `.button {
  color: white;
  background: blue;
  padding: 10px;
  display: block;
}`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'scss',
      filepath: 'test.scss',
    })

    expect(output).toBe(`.button {
  display: block;
  background: blue;
  padding: 10px;
  color: white;
}
`)
  })

  test('preserves CSS formatting with sorted properties', async () => {
    const input = `.card {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: relative;
}`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'css',
      filepath: 'test.css',
    })

    expect(output).toBe(`.card {
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
}
`)
  })
})

describe('HTML Attribute Sorting', () => {
  test('sorts HTML attributes alphabetically', async () => {
    const input = `<div id="test" class="container" data-value="123" role="main"></div>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
      filepath: 'test.html',
    })

    expect(output).toBe(
      `<div class="container" data-value="123" id="test" role="main"></div>\n`,
    )
  })

  test('sorts Vue v- directives to the top', async () => {
    const input = `<div id="app" class="wrapper" v-if="show" v-model="value" @click="handle"></div>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'vue',
      filepath: 'test.vue',
    })

    // v- directives should be at the top
    const lines = output.trim().split('\n')
    const attributes = lines[0].match(/(\w+[-:]?\w*)=/g) || []

    // First attributes should start with v-
    expect(attributes[0]).toMatch(/^v-/)
    expect(attributes[1]).toMatch(/^v-/)
  })

  test('sorts Vue @ event handlers to the bottom', async () => {
    const input = `<button @click="submit" class="btn" type="button" @mouseenter="hover" id="btn"></button>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'vue',
      filepath: 'test.vue',
    })

    // @ handlers should be at the bottom
    const attributesMatch = output.match(/<button\s+([^>]+)>/s)
    const attributesText = attributesMatch ? attributesMatch[1] : ''

    // Check that @ attributes come after regular attributes
    const classPos = attributesText.indexOf('class')
    const clickPos = attributesText.indexOf('@click')
    const mouseenterPos = attributesText.indexOf('@mouseenter')

    expect(classPos).toBeLessThan(clickPos)
    expect(classPos).toBeLessThan(mouseenterPos)
  })

  test('sorts Vue attributes with all three groups: v-, regular, @', async () => {
    const input = `<div @click="handle" class="box" v-if="visible" :key="id" id="container" @input="onInput" v-show="show"></div>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'vue',
      filepath: 'test.vue',
    })

    const attributesMatch = output.match(/<div\s+([^>]+)>/s)
    const attributesText = attributesMatch ? attributesMatch[1] : ''

    // Check order: v- directives first, then : shorthand, then regular, then @ handlers
    const vIfPos = attributesText.indexOf('v-if')
    const vShowPos = attributesText.indexOf('v-show')
    const keyPos = attributesText.indexOf(':key')
    const classPos = attributesText.indexOf('class')
    const idPos = attributesText.indexOf('id')
    const clickPos = attributesText.indexOf('@click')
    const inputPos = attributesText.indexOf('@input')

    // v- directives should be first
    expect(vIfPos).toBeGreaterThan(-1)
    expect(vShowPos).toBeGreaterThan(-1)
    expect(vIfPos).toBeLessThan(classPos)
    expect(vShowPos).toBeLessThan(classPos)

    // : shorthand should come after v- directives
    expect(keyPos).toBeGreaterThan(-1)
    expect(keyPos).toBeGreaterThan(vIfPos)

    // Regular attributes in the middle
    expect(classPos).toBeGreaterThan(-1)
    expect(idPos).toBeGreaterThan(-1)

    // @ handlers should be last
    expect(clickPos).toBeGreaterThan(classPos)
    expect(inputPos).toBeGreaterThan(idPos)
  })

  test('handles complex Vue component with mixed attributes', async () => {
    const input = `<input 
      type="text" 
      @input="handleInput" 
      v-model="username" 
      :value="val" 
      class="form-control" 
      id="user" 
      @focus="onFocus"
    />`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'vue',
      filepath: 'test.vue',
    })

    // Parse the formatted output
    const lines = output.trim().split('\n')

    // v-model should appear early (v- directives at top)
    const vModelLine = lines.findIndex((line) => line.includes('v-model'))
    const classLine = lines.findIndex((line) => line.includes('class='))
    const inputLine = lines.findIndex((line) => line.includes('@input'))

    expect(vModelLine).toBeLessThan(classLine)
    expect(classLine).toBeLessThan(inputLine)
  })
})
