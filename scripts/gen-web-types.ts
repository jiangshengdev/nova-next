import { readFileSync, writeFileSync } from 'node:fs'
import * as url from 'node:url'
import path from 'node:path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

// 读取 package.json
const pkg = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

// 读取 component-meta.json
const componentMeta = JSON.parse(
  readFileSync(path.join(__dirname, '../temp/component-meta.json'), 'utf-8'),
)

interface ComponentMeta {
  name: string
  path: string
  description: string
  props: { name: string; type: string; default?: string; description: string; required: boolean }[]
  events: { name: string; description: string; type?: string; schema?: string[] }[]
  slots: { name: string; type?: string; description: string }[]
}

// 转换为 web-types 格式
const webTypes = {
  $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
  framework: 'vue',
  name: pkg.name,
  version: pkg.version,
  'description-markup': 'markdown',
  contributions: {
    html: {
      'vue-components': componentMeta.map((component: ComponentMeta) => {
        const result: Record<string, unknown> = {
          name: component.name,
          description: component.description || undefined,
          source: { module: pkg.name, symbol: component.name },
        }

        // 布尔类型属性列表（可无值使用）
        const booleanProps = [
          'disabled',
          'readonly',
          'required',
          'autofocus',
          'primary',
          'alpha',
          'teleportToBody',
        ]

        if (component.props.length > 0) {
          result.props = component.props.map((p) => {
            const prop: Record<string, unknown> = {
              name: p.name,
              description: p.description,
            }

            if (p.type) {
              prop.type = p.type
            }

            if (p.default !== undefined) {
              prop.default = p.default
            }

            if (p.required) {
              prop.required = p.required
            }

            // 布尔属性可无值使用
            if (booleanProps.includes(p.name)) {
              prop.value = { kind: 'no-value' }
            }

            return prop
          })
        }

        if (component.events.length > 0) {
          // 处理 v-model 事件
          const modelEvent = component.events.find((e) => e.name === 'update:modelValue')

          if (modelEvent) {
            result['vue-model'] = {
              prop: 'modelValue',
              event: 'update:modelValue',
            }
          }

          // 所有事件（包括 update:modelValue）
          result.events = component.events.map((e) => {
            const event: Record<string, unknown> = {
              name: e.name,
              description: e.description,
            }

            // 从 type 中解析参数名，如 "[value: string]" -> ["value"]
            const argNames: string[] = []

            if (e.type) {
              const matches = e.type.matchAll(/(\w+):\s*\w+/g)

              for (const match of matches) {
                argNames.push(match[1])
              }
            }

            // 解析事件参数
            if (e.schema && e.schema.length > 0) {
              event.arguments = e.schema.map((type, index) => ({
                name: argNames[index] || `arg${index}`,
                type,
              }))
            }

            return event
          })
        }

        if (component.slots.length > 0) {
          result.slots = component.slots.map((s) => {
            const slot: Record<string, unknown> = {
              name: s.name,
              description: s.description,
            }

            if (s.type) {
              slot['vue-properties'] = [
                {
                  name: 'scoped',
                  type: s.type,
                },
              ]
            }

            return slot
          })
        }

        return result
      }),
    },
  },
}

writeFileSync(path.join(__dirname, '../dist/web-types.json'), JSON.stringify(webTypes, null, 2))

console.log('dist/web-types.json generated')
