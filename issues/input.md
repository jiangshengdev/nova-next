# Input 组件问题

## 1. v-model 无法受控（Major）

- 【已解决】

- 位置：`src/components/input/NovaInput.tsx`
- 描述：组件未实现 `modelValue` prop 及 `update:modelValue` 事件，`v-model` 编译产物被直接透传给原生 `<input>`，既无法反映外部受控值，也无法向父组件派发输入变更，导致双向绑定失效。
- 可能的解决方案建议：
	1. 声明 `modelValue` 与 `update:modelValue`，内联输入事件中 emit 更新值。
	2. 将受控值绑定到 `<input value>`，并在 `input`/`change` 事件里同步 props。
- 处理进度：`src/components/input/NovaInput.tsx` 已新增 `modelValue` prop、`update:modelValue` emit 及受控 value 绑定，`input.test.tsx` 同步补测 v-model 行为。

## 2. wrapStyle 类型不一致（Minor）

- 【待处理】

- 位置：`src/components/input/NovaInput.tsx`
- 描述：类型声明允许 `string | CSSProperties`，运行时 `props` 却仅接受 `Object`，若传入字符串样式会被 Vue 视为非法类型并被忽略，与类型签名不符。
- 可能的解决方案建议：
	1. 将 `wrapStyle` 的 prop `type` 扩展为 `[String, Object]`，与类型声明保持一致。
	2. 或者在类型层面改为 `CSSProperties`，避免字符串被误认为支持。

## 3. 组件类型未暴露（Minor）

- 【待处理】

- 位置：`src/components/input/index.ts`
- 描述：虽然在实现文件中声明了 `NovaInputProps`，但未对外导出，外部无法获取该类型用于封装或类型推断，API 不完整。
- 可能的解决方案建议：
	1. 在 `NovaInput.tsx` 中 `export type NovaInputProps` 并在 `src/components/input/index.ts`、`src/index.ts` 透传。
	2. 若不对外暴露类型，可在 README/API 文档中明确限制，避免调用方误用。
