# NovaColorPicker 取色器

<script setup>
import ColorPickerBasic from './demo/ColorPickerBasic.vue'
import ColorPickerAlpha from './demo/ColorPickerAlpha.vue'
import ColorPickerPreset from './demo/ColorPickerPreset.vue'
import ColorPickerTrigger from './demo/ColorPickerTrigger.vue'
</script>

NovaColorPicker 提供 HSV 面板、Hue/Alpha 滑条与 HEX/RGB/HSL 文本输入，默认通过 NovaDropdown 渲染浮层，并继承 NovaEnvironment 提供的主题与语言。可直接 `import { NovaColorPicker } from 'nova-next'` 使用；安装步骤请参阅 [快速开始](/getting-started)。

## 示例

### 基础用法

最常见的 3 个受控取色器，展示 v-model 与默认触发器外观。

::: info 预览

<ColorPickerBasic />

:::

::: details 源码

<<< @/components/color-picker/demo/ColorPickerBasic.vue

:::

### 透明度与格式

根据开关切换 Alpha 滑条，并在 HEX/RGB/HSL 三种输出间切换。

::: info 预览

<ColorPickerAlpha />

:::

::: details 源码

<<< @/components/color-picker/demo/ColorPickerAlpha.vue

:::

### 预设色卡

使用 `preset` 提供常用与主题色列表，面板关闭后自动回写最新值。

::: info 预览

<ColorPickerPreset />

:::

::: details 源码

<<< @/components/color-picker/demo/ColorPickerPreset.vue

:::

### 自定义触发器

通过 `trigger` 插槽替换触发按钮，仍保留下拉定位与焦点管理。

::: info 预览

<ColorPickerTrigger />

:::

::: details 源码

<<< @/components/color-picker/demo/ColorPickerTrigger.vue

:::

## 属性

| 名称             | 说明                                                              | 类型                      | 默认值         |
| ---------------- | ----------------------------------------------------------------- | ------------------------- | -------------- |
| `modelValue`     | 受控值，配合 `v-model` 使用，优先级高于 `value`。                 | `string`                  | `null`         |
| `value`          | 非受控初始值，未传入 `modelValue` 时生效。                        | `string`                  | `'#ff0000'`    |
| `alpha`          | 是否展示 Alpha 滑条与输入，关闭时会自动丢弃透明度。               | `boolean`                 | `false`        |
| `format`         | 决定 `v-model` 输出格式。                                         | `'hex' \| 'rgb' \| 'hsl'` | `'hex'`        |
| `preset`         | 预设色列表，传入十六进制或 CSS 颜色字符串即可渲染拾色块。         | `string[]`                | `null`         |
| `disabled`       | 禁用状态，继承自 NovaDropdown，会阻止触发与键盘交互。             | `boolean`                 | `false`        |
| `theme`          | 覆盖环境主题，内部同时写入 `data-nova-theme`。                    | `string`                  | `null`         |
| `placement`      | 下拉面板定位，同 NovaDropdown，支持 `bottomLeft` 等多个预设位置。 | `Placement`               | `'bottomLeft'` |
| `teleportToBody` | 是否将面板 Teleport 到 `document.body`，便于脱离溢出容器。        | `boolean`                 | `true`         |
| `panelClass`     | 作用于下拉面板的额外类名，可自定义尺寸与圆角。                    | `unknown`                 | `null`         |
| `panelStyle`     | 作用于下拉面板的内联样式。                                        | `StyleValue`              | `null`         |
| `panelProps`     | 添加到下拉面板根节点的原生属性，如 `data-*`。                     | `Record<string, unknown>` | `null`         |

## 插槽

| 名称      | 说明                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------- |
| `trigger` | 自定义触发器内容，保持焦点自动管理。作用域提供 `color`、`disabled` 等 `ColorPickerTriggerScoped` 数据。 |
| `preset`  | 自定义预设区域，可根据 `preset` 数组与 `setColorAndPosition` 方法自行渲染色卡。                         |

## 事件

| 名称                | 说明                                   |
| ------------------- | -------------------------------------- |
| `update`            | JSX 专用更新事件，返回最新颜色字符串。 |
| `update:modelValue` | `v-model` 所需的同步事件。             |

NovaColorPicker 不额外派发打开/关闭事件，相关需求可通过外层 NovaDropdown 处理。
