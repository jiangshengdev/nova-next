# Environment 组件问题

## 1. 主题覆盖被重置

【已解决】

- 位置：`src/components/environment/NovaEnvironment.tsx`
- 描述：在 `NovaEnvironment` 中 `themeRef = computed(() => props.theme ?? themeDefault)`，未读取上游 `themeKey`，若嵌套使用并仅想覆写语言，则该子组件会把主题回退为默认 `light`，破坏父级环境链路。
- 可能的解决方案建议：
  1. 先通过 `inject(themeKey, injectedThemeRef)` 获取父级引用，再在 `computed` 中优先阅读 `props.theme`，否则沿用父级，再回退默认值。
  2. 或直接复用 `useEnvironment` 的逻辑，在组件内部保持同一继承路径，避免二处实现走不同代码。（已在 `NovaEnvironment` 内实现）

## 2. 语言覆盖被重置

【已解决】

- 位置：`src/components/environment/NovaEnvironment.tsx`
- 描述：`languageRef = computed(() => props.language ?? languageDefault)` 未使用 `languageKey` 注入值，导致嵌套环境只覆写主题时会把语言强制重置为 `enUS`，与 `useEnvironment` 约定不符。
- 可能的解决方案建议：
  1. 注入父级 `languageKey` 并在缺省时沿用父值，然后才落到默认语言。
  2. 通过公用 hook（例如 `useEnvironment`）维护逻辑一致性，避免父子环境产生断层。（已在 `NovaEnvironment` 内实现）
