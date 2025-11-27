import * as url from 'node:url'
import path from 'node:path'
import { mkdirSync, writeFileSync } from 'node:fs'
import type { MetaCheckerOptions } from 'vue-component-meta'
import { createChecker } from 'vue-component-meta'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  printer: { newLine: 1 },
}

const checker = createChecker(path.join(__dirname, '../tsconfig.app.json'), checkerOptions)

const components = [
  { name: 'NovaButton', path: 'src/components/button/nova-button.tsx' },
  { name: 'NovaInput', path: 'src/components/input/nova-input.tsx' },
]

// 常用原生属性（不与自定义属性重复）
const commonButtonProps = ['disabled', 'type', 'autofocus', 'form', 'name', 'value']
const commonInputProps = [
  'type',
  'placeholder',
  'value',
  'maxlength',
  'minlength',
  'autofocus',
  'name',
  'required',
  'pattern',
  'autocomplete',
]

// 组件自定义属性白名单
const customPropsMap: Record<string, string[]> = {
  NovaButton: ['primary', 'icon', 'theme', 'language', ...commonButtonProps],
  NovaInput: [
    'class',
    'wrapperClass',
    'wrapperStyle',
    'disabled',
    'readonly',
    'modelValue',
    'theme',
    'language',
    ...commonInputProps,
  ],
}

// 手动补充事件（函数式组件 emits 无法被静态分析）
const customEventsMap: Record<string, { name: string; description: string }[]> = {
  NovaButton: [],
  NovaInput: [{ name: 'update:modelValue', description: '输入值更新事件' }],
}

const result = components.map(({ name, path: componentPath }) => {
  const fullPath = path.join(__dirname, '..', componentPath)
  const meta = checker.getComponentMeta(fullPath, name)
  const customProps = customPropsMap[name] || []

  return {
    name,
    path: componentPath,
    props: meta.props
      .filter((p) => !p.global && customProps.includes(p.name))
      .map((p) => ({
        name: p.name,
        type: p.type,
        default: p.default,
        description: p.description,
        required: p.required,
      })),
    events:
      meta.events.length > 0
        ? meta.events.map((e) => ({
            name: e.name,
            description: e.description,
          }))
        : customEventsMap[name] || [],
    slots: meta.slots.map((s) => ({
      name: s.name,
      description: s.description,
    })),
  }
})

const tempDir = path.join(__dirname, '../temp')

mkdirSync(tempDir, { recursive: true })

writeFileSync(path.join(tempDir, 'component-meta.json'), JSON.stringify(result, null, 2))

console.log('temp/component-meta.json generated')
