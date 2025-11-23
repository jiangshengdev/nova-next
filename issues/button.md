# Button 组件问题

## 1. 类型未完整暴露
【未解决】
- 位置：`src/components/button/NovaButton.tsx`
- 描述：组件仅导出 `ButtonProps`，实际运行时还依赖 `ButtonHTMLAttributes`。二者未结合暴露将导致消费方在 TS 层无法传递 `disabled`、`type`、`onClick` 等原生按钮属性，出现类型错误，API 文档与真实行为不符。
- 可能的解决方案建议：
  1. 新增 `export type NovaButtonProps = ButtonProps & ButtonHTMLAttributes` 并在公共入口导出，供外部复用。
  2. 或直接扩充 `ButtonProps`，显式声明需要透传的原生属性集合，保持类型定义与渲染行为一致。

## 2. 子节点被强制包裹 span
【未解决】
- 位置：`src/components/button/NovaButton.tsx`
- 描述：`renderChildren` 无条件用 `<span>` 包裹插槽内容，若下游传入块级或语义元素（如 `<label>`、`<ul>`、`<div>`），会形成非法嵌套并破坏可访问性结构，影响布局。
- 可能的解决方案建议：
  1. 返回 `children` 本身，避免额外包裹，必要时仅在需要的场景包裹 `span`。
  2. 根据插槽内容类型或 `props` 决定是否包裹，例如允许传入 `inline` 标志控制呈现方式。

## 3. 单测缺乏交互覆盖
【未解决】
- 位置：`src/components/button/__tests__/button.test.tsx`
- 描述：现有测试全部为快照断言，未覆盖点击、禁用、属性透传、ARIA 等行为，导致交互或可访问性回归无法在测试阶段被发现。
- 可能的解决方案建议：
  1. 新增针对点击回调、禁用态、键盘可用性的行为测试，用 `wrapper.get('button')` 触发事件并断言效果。
  2. 补充属性透传与主题标记的断言（如 `data-nova-theme`、`aria-*`），确保组件在多环境场景下可靠。
