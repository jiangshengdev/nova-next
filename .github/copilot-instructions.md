# Nova Next AI 协作指南

## 语言约定

- **中文输出**: 项目内文档、代码注释以及机器人回复统一使用中文，保持沟通一致性。

## 项目速览

- **组件定位**: `src/index.ts` 聚合导出 Nova 环境、按钮、输入、下拉、取色器等 Vue 3 TSX 组件，作为 npm 包发布入口。
- **运行入口**: `src/main.ts` + `App.tsx` 通过 `NovaEnvironment` 包裹路由示例页，演示主题、语言与文本方向切换。
- **路由结构**: `src/router/index.ts` 使用懒加载将演示页面拆分在 `src/views/demos/*`，方便定位组件使用方式。
- **语言资源**: `src/environments/languages/*.ts` 定义主题内文案，`App.tsx` 直接在运行时切换并通过环境注入下传。

## 开发流程

- **本地调试**: `yarn dev` 启动 Vite 示例站点，默认端口 3000。
- **组件构建**: `yarn build` 顺序执行 `gulp:clean → gulp:style → gulp:lib`，分别清理、产出 CSS、使用 esbuild/rollup 生成 JS+DTS。
- **独立任务**: `yarn gulp:style` 只重新编译 `src/styles`，`yarn gulp:lib` 跑完整构建，`yarn build:demo` 打包示例站点。
- **发布前置**: `yarn prepublishOnly` 会跑 `yarn format` 与 `yarn build`，提交前务必保证通过。

## 组件模式

- **环境注入**: 组件若支持主题/语言，需继承 `EnvironmentProps` 并调用 `useEnvironment`，如 `NovaButton`、`NovaDropdown`。
- **Props 复用**: 公共 props 在 `environmentProps`、`dropdownProps` 等对象中集中维护，新增组件应复用以保持一致。
- **TSX 导出**: 每个组件以 `as unknown as { new(): { $props: ... } }` 导出，保证 TS 推断，在新增组件时保留此包装。
- **下拉交互**: `NovaDropdown` 内部依赖 `uses/use-dropdown.ts` 做焦点陷阱与定位，子组件（如取色器）通过插槽拿到 `dropdownInstance` 以手动关闭。
- **颜色工具**: 取色器使用 `components/color-picker/color.ts` 的 `Color` 类转换格式，避免自行操作字符串或手写转换。

## 样式与主题

- **集中入口**: `src/styles/index.css` 聚合所有组件样式，新增组件需在此 `@import` 对应 `styles/index.css`。
- **主题变量**: `styles/themes/*.css` 通过 `data-nova-theme` 切换变量；新增主题须在 `NovaEnvironment` 设置的同名属性下生效。
- **PostCSS 特性**: 样式允许嵌套语法（依赖 `postcss-nested`），保持与现有写法一致。
- **无内联色值**: 组件 CSS 使用 `--nova-*` 变量，必要时先在 `themes/vars.css` 定义再引用。

## 测试策略

- **测试命令**: `yarn test` 运行 Jest，配置位于 `jest.config.js`，自动加载 `tests/setup.ts`。
- **TSX 测试**: 测试文件使用 TSX + `vueJsxCompat`（参见 `components/button/__tests__/button.test.tsx`），新增测试需导入该兼容层。
- **快照基准**: 大量测试依赖 `__snapshots__`，更新组件结构时使用 `yarn test --updateSnapshot` 同步。

## 文档与构建

- **文档站点**: `docs/` 采用 VitePress，`yarn doc:dev` 本地预览，`yarn doc:dist` 生成静态站点。
- **自动注册**: `build/tasks/register-components.ts` 会扫描 `docs/.vitepress/components` 并写入 `theme/register-components.js`，新增文档组件需放置于该目录。
- **类型管线**: `build/tasks/rollup-dts.ts` 将 TS 编译到 `temp/`，随后 `api-extractor`（配置见 `api-extractor.json`）生成公共声明。
- **打包细节**: `bundle-script.ts` 使用 esbuild，JSX 工厂固定为 `vueJsxCompat`，并将 `vue` 与图标库设为 external。

## 易踩坑

- **JSX 工厂**: TS 配置 `jsxFactory: "vueJsxCompat"`，在任何 TSX 文件（含测试）都需 `import { vueJsxCompat } from '../vue-jsx-compat'`，否则打包/测试会失败。
- **环境透传**: 嵌套组件需要显式把 `environment` 继续传递（例如 `NovaColorPicker` 使用 `NovaDropdown` 时），否则主题语言会断链。
- **焦点陷阱**: `NovaDropdown` 会在面板内插入 `data-nova-trap` 元素，自定义内容时避免移除这些节点或修改 `tabindex`。
- **CI 兼容性**: 构建依赖 `temp/` 目录存在，勿手动删除编译过程中产出的 `.d.ts`，清理走 `yarn gulp:clean`。
