# 快速开始

以 NovaButton 为例，快速完成 Nova Next 组件的集成与渲染。

## 环境需求

- Node.js ≥ 20.19
- 推荐使用 `pnpm`，亦可使用 npm / yarn

## 安装依赖

::: code-group

```bash [pnpm]
pnpm add @jiangshengdev/nova-next
```

```bash [npm]
npm install @jiangshengdev/nova-next
```

```bash [yarn]
yarn add @jiangshengdev/nova-next
```

:::

## 引入样式

Nova Next 支持全量与按需两种引入策略，可根据项目大小和 Tree Shaking 需求选择：

### 方式一 · 全量样式

在应用入口（如 `main.ts`）统一加载全部样式，适合快速验收：

```ts
import '@jiangshengdev/nova-next/style.css'
```

### 方式二 · 按需样式

在具体组件内仅引入所需的主题与按钮样式，减少不必要的 CSS：

```ts
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
```

## 渲染按钮

下面的单文件组件展示了最基础的使用方式：

```vue
<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton } from '@jiangshengdev/nova-next'

const handleClick = () => {
  console.log('点击 NovaButton')
}
</script>

<template>
  <NovaButton primary @click="handleClick">创建项目</NovaButton>
</template>
```

## 下一步

- 继续在页面中导入其他组件与样式文件，例如输入框或取色器。
- 使用 `NovaEnvironment` 统一主题与语言，或前往按钮文档查看更多示例。
