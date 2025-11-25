# Nova Next 简介

Nova Next 是一套面向现代应用的 Vue 3 组件库，默认采用 TSX + Vite 构建，主打轻量与主题可配置。组件交互、样式与语言环境通过 `NovaEnvironment` 统一管理，可在不同终端保持一致体验。

## 核心特性

- **响应式主题**：内置深浅色主题与变量体系，可在运行时切换。
- **按需加载**：组件与样式均支持按需引入，适合渐进式集成。
- **TypeScript 友好**：完整的类型提示与属性约束，便于在大型项目中维护。
- **无障碍关注**：按钮、下拉、取色器等组件内置 ARIA 语义与键盘支持。

## 快速入门

1. 安装依赖：`pnpm add @jiangshengdev/nova-next`
2. 在入口文件引入 `@jiangshengdev/nova-next/style.css`
3. 任意组件中导入需要的控件：

```ts
import { NovaButton } from '@jiangshengdev/nova-next'
```

4. 可选：使用 `NovaEnvironment` 包裹应用，统一主题与语言。

## 更多内容

- 在 `docs/getting-started.md` 查看完整快速开始流程。
- 访问按钮、输入框、取色器等组件文档，了解 Props、示例与最佳实践。
- 如需演练交互，可运行 `pnpm docs:dev` 查看文档站点或 `pnpm play` 打开 playground。
