# NovaInput 输入框

<script setup>
import InputBasic from './demo/InputBasic.vue'
import InputStates from './demo/InputStates.vue'
import InputInteractive from './demo/InputInteractive.vue'
</script>

NovaInput 提供语义化的文本输入体验，保持与原生 `<input>` 相同的属性与行为，并可结合 NovaEnvironment 注入主题。通过 `import { NovaInput } from 'nova-next'` 直接使用；如需安装与样式指引，请访问 [快速开始](/getting-started)。

## 示例

### 基础用法

::: info 预览

<InputBasic />

:::

::: details 源码

<<< @/components/input/demo/InputBasic.vue

:::

### 状态切换

::: info 预览

<InputStates />

:::

::: details 源码

<<< @/components/input/demo/InputStates.vue

:::

### 交互能力

::: info 预览

<InputInteractive />

:::

::: details 源码

<<< @/components/input/demo/InputInteractive.vue

:::

## 属性

| 名称           | 说明                                              | 类型         | 默认值  |
| -------------- | ------------------------------------------------- | ------------ | ------- |
| `modelValue`   | 受控输入值，可使用 `v-model` 或手动监听更新同步。 | `string`     | `null`  |
| `disabled`     | 禁用输入框并同步样式与 `aria-disabled`。          | `boolean`    | `false` |
| `readonly`     | 只读模式，不触发更新与 `update:modelValue`。      | `boolean`    | `false` |
| `wrapperClass` | 自定义最外层容器类名，可用于控制布局与间距。      | `unknown`    | `null`  |
| `wrapperStyle` | 自定义容器内联样式。                              | `StyleValue` | `null`  |
| `class`        | 作用于原生 `<input>` 的类名，便于定制文本样式。   | `unknown`    | `null`  |
| `theme`        | 覆盖环境主题，内部同时写入 `data-nova-theme`。    | `string`     | `null`  |

> 其他属性（如 `type`、`placeholder`、`required` 等）与原生 `<input>` 保持一致，可直接透传。

## 插槽

NovaInput 不提供插槽，内容完全由输入值渲染。

## 事件

| 名称                | 说明                                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| `update:modelValue` | 与 `modelValue` 配套的同步事件，返回最新字符串。                         |
| 原生事件            | 支持 `input`、`focus`、`blur` 等全部原生输入事件，直接在组件上监听即可。 |
