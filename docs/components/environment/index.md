# NovaEnvironment 环境容器

<script setup>
import EnvironmentBasic from './demo/EnvironmentBasic.vue'
import EnvironmentLanguage from './demo/EnvironmentLanguage.vue'
</script>

NovaEnvironment 统一向子树注入主题与语言上下文，让 Nova 系列组件共享 `data-nova-theme` 与多语言文案。可在应用根部或局部区域通过 `import { NovaEnvironment } from 'nova-next'` 包裹使用；更多安装说明可参考 [快速开始](/getting-started)。

## 示例

### 主题注入

::: info 预览

<EnvironmentBasic />

:::

::: details 源码

<<< @/components/environment/demo/EnvironmentBasic.vue

:::

### 语言与局部覆盖

::: info 预览

<EnvironmentLanguage />

:::

::: details 源码

<<< @/components/environment/demo/EnvironmentLanguage.vue

:::

## 属性

| 名称       | 说明                                                 | 类型       | 默认值       |
| ---------- | ---------------------------------------------------- | ---------- | ------------ |
| `theme`    | 覆盖当前子树使用的 Nova 主题。                       | `string`   | 继承上层环境 |
| `language` | 覆盖当前子树使用的语言包对象，控制 aria/提示等文案。 | `Language` | 继承上层环境 |

> 若不存在上层环境，组件会自动退回到 `light` 主题与 `en-US` 语言。

## 插槽

| 名称      | 说明                             |
| --------- | -------------------------------- |
| `default` | 默认插槽，包裹需要注入的子节点。 |

## 事件

NovaEnvironment 不派发自定义事件。
