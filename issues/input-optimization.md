# Input 组件优化追踪

## 1. 支持原生 type 透传

【已完成】

- 位置：`src/components/input/nova-input.tsx`
- 描述：组件默认写死 `type="text"`，无法覆盖为 `password`、`email` 等。
- 优化：在组装 `inputProps` 时优先读取 `attrs.type`，缺省再回退到 `text`，同时保持 `inheritAttrs = false` 的受控传递（`inputTypeAttr ?? 'text'`）。

## 2. 解构环境与属性

【已完成】

- 位置：`src/components/input/nova-input.tsx`
- 描述：`props`、`attrs`、`useEnvironment` 的返回值散落在函数体内，影响可读性。
- 优化：仿照 Button，将 `themeRef`、`disabled`、`readonly`、`wrapperClass` 等在顶部集中解构，并通过注释划分“环境上下文 / 内容计算 / 渲染输出”三个阶段，保持阅读顺序一致。

## 3. 只读态阻止双向更新

【已完成】

- 位置：`src/components/input/nova-input.tsx`
- 描述：`readonly` 或 `disabled` 时依然会触发 `emit('update:modelValue')`，与“只读不写”预期不符。
- 优化：在 `handleInput` 中检测 `props.readonly || props.disabled`，命中时直接返回，避免错误写入与监听触发。

## 4. 统一条件类名与可访问性

【已完成】

- 位置：`src/components/input/nova-input.tsx`
- 描述：`wrapperClasses` 目前依赖手写类型守卫，且缺少 `aria-disabled`、`aria-readonly`。
- 优化：沿用按钮的数组 + `filter(Boolean)` 组合方式生成类名，并为 `input` 元素补充相应的 `aria` 属性（`aria-disabled` / `aria-readonly`）。

## 5. 测试结构补齐

【已完成】

- 位置：`src/components/input/__tests__`
- 描述：仅有 basic/behavior/environment 三类，用例层次仍混合属性与状态断言。
- 优化：新增 `input.attributes.test.tsx`、`input.state.test.tsx`，分别覆盖属性透传（`type`、`wrapperClass`、`wrapperStyle` 等）与状态类名 / aria 场景，并将相关断言从 behavior 套件中拆分出来，测试维度更清晰。
