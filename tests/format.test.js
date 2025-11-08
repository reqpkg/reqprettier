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

    // Properties should be sorted with positioning/layout first, then box model, then visual
    const lines = output.trim().split('\n')
    expect(lines[1].trim()).toContain('display:')
    expect(lines[2].trim()).toContain('position:')
    // Margin and padding come after display/position
    expect(output.indexOf('margin')).toBeGreaterThan(output.indexOf('position'))
    expect(output.indexOf('color')).toBeGreaterThan(output.indexOf('padding'))
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

    // Display should come before padding and background
    expect(output.indexOf('display')).toBeLessThan(output.indexOf('padding'))
    expect(output.indexOf('display')).toBeLessThan(output.indexOf('background'))
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

    // Position should come before padding and border
    expect(output.indexOf('position')).toBeLessThan(output.indexOf('padding'))
    expect(output.indexOf('position')).toBeLessThan(output.indexOf('border-radius'))
  })
})
