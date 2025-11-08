import { describe, expect, test } from 'vitest'
import * as prettier from 'prettier'
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
