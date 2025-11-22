# nova-next 现代化迁移规划

## 背景

- 目标：将 2020 年的组件库工程逐步对齐 2025 年 `pnpm create vue@latest`（含 TypeScript / JSX / Router / Pinia / Vitest / Playwright / ESLint Flat / Prettier / Oxlint / rolldown-vite）生成的配置。
- 范围：优先迁移演示站（demo）到 Vite + rolldown；组件打包仍维持现有 Gulp + Rollup 流程，待后续评估再升级。

## 约束与共识

- 保留 `build/tasks/*` 中的 Gulp 流水线，确保组件包产物与发布流程不受影响。
- Demo 及本地开发体验迁移至纯 Vite（rolldown）方案，逐步减少历史配置耦合。
- 测试体系允许一次性切换为 Vitest，并接受重新生成快照。
- Lint / Format 采用新脚手架的 ESLint Flat + Oxlint + Prettier 组合。

## 子任务清单

| 序号 | 子任务              | 说明                                                                                                                                  | 负责人 | 进度     |
| ---- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------- |
| 1    | 包管理与脚本切换    | 从 Yarn 迁移至 pnpm，更新 `package.json` scripts 以匹配新脚手架（含 dev/build/preview/typecheck/lint/test/test:e2e/format/prepare）。 | 待定   | ☐ 未开始 |
| 2    | TypeScript 配置重构 | 拆分 `tsconfig` 为 app / node / vitest / e2e 引用结构，对齐路径别名与声明输出。                                                       | 待定   | ☐ 未开始 |
| 3    | Demo 构建迁移       | 以 rolldown-vite 重写 `vite.config.ts`，保留组件包 Gulp 任务；更新 Router / Pinia / Devtools 配置。                                   | 待定   | ☐ 未开始 |
| 4    | 测试体系替换        | 从 Jest + Babel 切换到 Vitest + Playwright，重建测试入口、setup、脚本，重新生成快照。                                                 | 待定   | ☐ 未开始 |
| 5    | 质量工具升级        | 引入 ESLint Flat Config + Oxlint + 新 Prettier 规则，确保与 `vue-project` 一致，并更新 CI / pnpm 流程。                               | 待定   | ☐ 未开始 |

## 后续记录

- 进展、决策或阻塞请在表格下方追加日志，标注日期与责任人。
- 2025-11-22：任务 1 - `package.json` 切换至 pnpm 脚本体系，新增 lint/test/type-check 命令。（Copilot 协助）
- 2025-11-22：任务 2 - 拆分 TypeScript 配置（app/node/vitest/e2e），新增 `@vue/tsconfig`、提升 `vue-tsc`，并更新 Gulp 声明构建指向 `tsconfig.app.json`。（Copilot 协助）
