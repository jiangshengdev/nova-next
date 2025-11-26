# NovaButton 按钮

<script setup>
import ButtonBasic from './demo/ButtonBasic.vue'
import ButtonIconDemo from './demo/ButtonIconDemo.vue'
import ButtonInteractiveDemo from './demo/ButtonInteractiveDemo.vue'
</script>

NovaButton 提供语义化按钮基础能力，并保持与原生 `<button>` 一致的交互语义，可直接通过 `import { NovaButton } from 'nova-next'` 使用；如需安装与样式指引，请访问 [快速开始](/getting-started)。

## 示例

### 基础用法

::: info 预览

<ButtonBasic />

:::

::: details 源码

<<< @/components/button/demo/ButtonBasic.vue

:::

### 图标拓展

::: info 预览

<ButtonIconDemo />

:::

::: details 源码

<<< @/components/button/demo/ButtonIconDemo.vue

:::

### 交互响应

::: info 预览

<ButtonInteractiveDemo />

:::

::: details 源码

<<< @/components/button/demo/ButtonInteractiveDemo.vue

:::

## 属性

| 名称       | 说明                                                         | 类型                              | 默认值      |
| ---------- | ------------------------------------------------------------ | --------------------------------- | ----------- |
| `type`     | 按钮语义类型，完全透传原生 `button`。                        | `'button' \| 'submit' \| 'reset'` | `button`    |
| `primary`  | 是否启用主题主按钮外观。                                     | `boolean`                         | `false`     |
| `icon`     | 设置图标节点，若仅含图标会自动添加 `nova-button-icon-only`。 | `VNodeChild`                      | `undefined` |
| `disabled` | 禁用状态，阻止交互并同步样式。                               | `boolean`                         | `false`     |
| `theme`    | 覆盖环境主题，内部同时写入 `data-nova-theme`。               | `string`                          | `null`      |

> 其他属性与事件均继承 `ButtonHTMLAttributes`，可自由传入。

## 插槽

| 名称      | 说明                                     |
| --------- | ---------------------------------------- |
| `default` | 按钮文本或自定义内容。                   |
| `icon`    | 自定义图标区域，优先级高于 `icon` 属性。 |

## 事件

| 名称     | 说明                                                                     |
| -------- | ------------------------------------------------------------------------ |
| 原生事件 | 支持 `click`、`focus`、`blur` 等全部原生按钮事件，直接在组件上监听即可。 |
