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

describe('HTML Attribute Sorting', () => {
  test('sorts HTML attributes according to configuration', async () => {
    const input = `<div aria-label="test" data-id="123" id="myid" class="myclass" onclick="handleClick()"></div>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
    })

    // Check that class comes first, then id, then data-, then aria-
    const attributeOrder = output.match(/(class|id|data-\w+|aria-\w+|onclick)=/g)
    expect(attributeOrder[0]).toContain('class')
    expect(attributeOrder[1]).toContain('id')
    expect(attributeOrder[2]).toContain('data-')
  })

  test('sorts attributes within groups alphabetically', async () => {
    const input = `<input type="text" name="username" id="user" />`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
    })

    // id should come before name based on attributeGroups order
    const idIndex = output.indexOf('id=')
    const nameIndex = output.indexOf('name=')
    expect(idIndex).toBeLessThan(nameIndex)
  })

  test('sorts data attributes alphabetically', async () => {
    const input = `<div data-z="z" data-a="a" data-m="m"></div>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
    })

    // Should be sorted alphabetically: data-a, data-m, data-z
    const dataAIndex = output.indexOf('data-a=')
    const dataMIndex = output.indexOf('data-m=')
    const dataZIndex = output.indexOf('data-z=')
    expect(dataAIndex).toBeLessThan(dataMIndex)
    expect(dataMIndex).toBeLessThan(dataZIndex)
  })

  test('sorts aria attributes alphabetically', async () => {
    const input = `<button aria-pressed="true" aria-label="Click me" aria-disabled="false"></button>`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
    })

    // Should be sorted alphabetically: aria-disabled, aria-label, aria-pressed
    const disabledIndex = output.indexOf('aria-disabled=')
    const labelIndex = output.indexOf('aria-label=')
    const pressedIndex = output.indexOf('aria-pressed=')
    expect(disabledIndex).toBeLessThan(labelIndex)
    expect(labelIndex).toBeLessThan(pressedIndex)
  })

  test('handles complex HTML with multiple attributes', async () => {
    const input = `<img alt="Logo" src="/logo.png" title="Company Logo" class="logo" />`

    const output = await prettier.format(input, {
      ...prettierConfig,
      parser: 'html',
    })

    // class should come before src, title, and alt
    const classIndex = output.indexOf('class=')
    const srcIndex = output.indexOf('src=')
    expect(classIndex).toBeLessThan(srcIndex)
  })
})
