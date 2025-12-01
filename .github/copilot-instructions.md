## 总览

- Nova Next 是一个基于 Vue 3 的组件库（TSX 优先），由 `src/index.ts` 统一导出，目前包含 NovaButton / NovaInput / NovaColorPicker / NovaDropdown / NovaEnvironment 以及语言包 `enUS`、`zhCN`。
- `src/components/*` 遵循固定结构：TSX 实现、`styles/index.css` 样式、`__tests__/` 下的 Vitest 套件；新增组件必须保持同样布局。
- 手动演示位于 `playground/`（Vite 应用，通过 `NovaEnvironment` 切换主题/语言/方向），文档在 `docs/`（VitePress），`issues/*.md` 记录已解决设计决策，修改行为前先查阅。

## 构建与运行

- 常规开发运行 `pnpm dev`（tsdown --watch），根据 `tsdown.config.ts` 生成 ESM 与 d.ts 到 `dist/`。
- `pnpm play` 启动 playground（`vite.config.ts` 中 alias `@ -> src`），`pnpm play:build` 依次执行 `vue-tsc` 与 `vite build` 以模拟 CI。
- 样式单独打包：执行 `pnpm styles:build` 将 `src/styles/index.css` 与各组件 `styles/index.css` 编译到 `dist/styles/`，配置由 `vite.styles.config.ts` 驱动。
- 文档/开发者门户：`pnpm docs:dev` 编辑 VitePress，发布前运行 `pnpm docs:build` / `pnpm docs:preview`。
- 生产发布流程：`pnpm build && pnpm styles:build && pnpm gen:web-types`（也在 `prepublishOnly` 中自动执行）。

## 架构与模式

- 组件采用 TSX 函数组件与 `defineComponent` 混合写法，通过 `ComponentPropsOptions` 声明 props，固定 `inheritAttrs = false` 并手动透传原生属性（参考 `src/components/button/nova-button.tsx`、`src/components/input/nova-input.tsx`）。
- 主题与多语言由 `NovaEnvironment` + `use-environment.ts` 驱动：props 优先于注入值，每个渲染根节点都写入 `data-nova-theme={themeRef.value}`，以激活 `src/styles/themes` 下的 CSS 变量。
- 浮层类组件依赖 `NovaDropdown` + `use-dropdown.ts` 提供定位、焦点陷阱与键盘状态；通过作用域插槽传递 `triggerAutoFocusRef` / `panelAutoFocusRef`，`NovaColorPicker` 的触发器/面板即为示例。
- 拖拽或指针密集的交互复用 `src/uses/` 中的钩子（`use-move`、`use-touchmove`、`use-mousemove`），颜色计算位于 `src/components/color-picker/color.ts`，不要重复实现 HSVA 转换。
- CSS 类统一命名空间（如 `nova-button-*`、`nova-dropdown-*`），保留 `.nova-trap`、`data-nova-theme`、`data-nova-trap` 等哨兵节点，若需调整需同步更新样式与测试。
- 元数据链路：`scripts/gen-component-meta.ts` → `temp/component-meta.json` → `scripts/gen-web-types.ts`，新组件需注册到 `components[]`、`customPropsMap`、`customEventsDescMap` 后再执行 `pnpm gen:web-types`，否则 IDE 补全会缺失。

## 测试

- 单元测试使用 Vitest + jsdom（`pnpm test:unit`），配置继承 `vite.config.ts` 保持 alias/plugin 一致，`tests/setup.ts` 关闭 Vue transition stub，确保快照真实。
- 每个组件的测试位于对应 `__tests__/`，快照存在 `__snapshots__/`，交互类用例（如 `button.behavior.test.tsx`）需要断言 DOM 属性与事件，而非只看快照。
- 迭代单个套件可运行 `pnpm vitest src/components/button/__tests__/button.environment.test.tsx` 等路径。
- Playwright（`pnpm test:e2e`）本地会启动 `pnpm play`（5173），CI 使用 `pnpm preview`（4173）；在 CI 模式下记得先跑 `pnpm build && pnpm styles:build`，以保证下拉/拾色器资源齐全。

## 工具与质量

- Lint 分两步：`pnpm lint:oxlint`（Rust 规则）与 `pnpm lint:eslint`（Vue + stylistic + @vitest），`pnpm lint` 通过 `npm-run-all` 串联二者。
- 格式化使用 Prettier 3 + `@prettier/plugin-oxc`，`pnpm format` 仅覆盖 docs/e2e/issues/playground/scripts/src/tests。
- Node 版本要求 ≥20.19 或 ≥22.12（见 `package.json` engines）；pnpm workspace 依赖 `onlyBuiltDependencies` 保证可复现安装。
- 修改类型前先运行 `pnpm type-check`（`vue-tsc --build`），tsdown 共享同一个 tsconfig（`fromVite: true`），类型错误会阻塞产物构建。

## 参考与提示

- 别名 `@` 始终指向 `src/`；保持绝对路径导入，方便 Vite、tsdown、Vitest 及 `vue-component-meta`。
- 语言资源位于 `src/environments/languages/*.ts`，必须符合 `src/types/language.ts` 定义；UI 文案（如 `NovaColorPicker`）通过 `environment.languageRef.value` 读取。
- 若需确认需求，请先查阅 `issues/*.md` 中的历史记录；行为有更新时同步维护这些说明文件。
