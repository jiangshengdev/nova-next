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
  { name: 'NovaEnvironment', path: 'src/components/environment/NovaEnvironment.tsx' },
  { name: 'NovaColorPicker', path: 'src/components/color-picker/NovaColorPicker.tsx' },
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
  NovaEnvironment: ['theme', 'language'],
  NovaColorPicker: [
    'modelValue',
    'value',
    'alpha',
    'format',
    'preset',
    'disabled',
    'theme',
    'language',
    'panelClass',
    'panelStyle',
    'panelProps',
    'teleportToBody',
    'placement',
  ],
}

// 手动补充事件描述
const customEventsDescMap: Record<string, Record<string, string>> = {
  NovaButton: {},
  NovaInput: { 'update:modelValue': '输入值变化时触发' },
  NovaEnvironment: {},
  NovaColorPicker: {
    update: '颜色更新时触发',
    'update:modelValue': '颜色值变化时触发（用于 v-model）',
  },
}

// TSX 组件的描述回退（vue-component-meta 对 TSX 组件不提取组件级 JSDoc）
const fallbackDescMap: Record<string, string> = {
  NovaButton: '语义化按钮组件，保持与原生 button 一致的交互语义',
  NovaInput: '语义化文本输入组件，保持与原生 input 相同的属性与行为',
  NovaEnvironment: '环境配置组件，为子组件提供主题和语言上下文',
  NovaColorPicker: '颜色选择器组件，支持多种颜色格式和透明度选择',
}

const result = components.map(({ name, path: componentPath }) => {
  const fullPath = path.join(__dirname, '..', componentPath)
  const meta = checker.getComponentMeta(fullPath, name)
  const customProps = customPropsMap[name] || []

  // vue-component-meta 不提取组件级 JSDoc，使用手动配置
  const description = fallbackDescMap[name] || ''

  return {
    name,
    path: componentPath,
    description,
    props: meta.props
      .filter((p) => !p.global && customProps.includes(p.name))
      .map((p) => {
        // 从 tags 中提取 @default 值
        const defaultTag = p.tags?.find((t) => t.name === 'default')
        const defaultValue = defaultTag?.text ?? p.default

        return {
          name: p.name,
          type: p.type,
          default: defaultValue,
          description: p.description,
          required: p.required,
        }
      }),
    events: meta.events.map((e) => ({
      name: e.name,
      description: e.description || customEventsDescMap[name]?.[e.name] || '',
      type: e.type,
      schema: e.schema,
    })),
    slots: meta.slots.map((s) => ({
      name: s.name,
      type: s.type,
      description: s.description,
    })),
  }
})

const tempDir = path.join(__dirname, '../temp')

mkdirSync(tempDir, { recursive: true })

writeFileSync(path.join(tempDir, 'component-meta.json'), JSON.stringify(result, null, 2))

console.log('temp/component-meta.json generated')
