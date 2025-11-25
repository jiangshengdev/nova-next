import { resolve } from 'node:path'

import { globbySync } from 'globby'
import { kebabCase } from 'lodash-es'
import { defineConfig } from 'vite'

const componentEntries = globbySync('src/components/*/styles/index.css').reduce<
  Record<string, string>
>((entries, filePath) => {
  const normalized = filePath.replace(/\\/g, '/')
  const match = normalized.match(/src\/components\/([^/]+)\/styles\/index\.css$/)

  if (!match) {
    return entries
  }

  const componentName = kebabCase(match[1])

  entries[componentName] = resolve(__dirname, filePath)

  return entries
}, {})

const styleEntries = {
  all: resolve(__dirname, 'src/styles/index.css'),
  themes: resolve(__dirname, 'src/styles/themes/index.css'),
  ...componentEntries,
}

export default defineConfig({
  publicDir: false,
  build: {
    emptyOutDir: true,
    outDir: 'dist/styles',
    assetsDir: '.',
    minify: false,
    cssMinify: false,
    rolldownOptions: {
      input: styleEntries,
      output: {
        assetFileNames: '[name][extname]',
      },
    },
  },
})
