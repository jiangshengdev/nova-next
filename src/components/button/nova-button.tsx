import {
  type ButtonHTMLAttributes,
  type ComponentPropsOptions,
  type FunctionalComponent,
  type PropType,
  type VNodeChild,
} from 'vue'
import {
  environmentProps,
  type EnvironmentProps,
} from '@/components/environment/NovaEnvironment.tsx'
import { useEnvironment } from '@/uses/use-environment.ts'

/**
 * NovaButton 基础属性接口
 * @extends EnvironmentProps
 */
export interface NovaButtonBaseProps extends EnvironmentProps {
  /**
   * 是否启用主题主按钮外观
   * @default false
   */
  primary?: boolean
  /**
   * 图标节点，若仅含图标会自动添加 nova-button-icon-only 样式类
   * @default null
   */
  icon?: VNodeChild
}

const novaButtonPropDefs: ComponentPropsOptions<NovaButtonProps> = {
  ...environmentProps,
  primary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: null as unknown as PropType<VNodeChild>,
    default: null,
  },
}

/**
 * NovaButton 完整属性类型
 */
export type NovaButtonProps = NovaButtonBaseProps & ButtonHTMLAttributes

/**
 * 语义化按钮组件，保持与原生 button 一致的交互语义
 */
const NovaButton: FunctionalComponent<NovaButtonProps> = (props, context) => {
  // 环境上下文
  const { themeRef } = useEnvironment(props)
  const { slots, attrs } = context

  // 内容计算
  const { primary, icon: fallbackIcon } = props

  const children = slots.default?.()
  const icon = slots.icon?.() || fallbackIcon

  // 根据当前内容与属性动态拼装样式
  const buttonClasses = [
    'nova-button',
    icon && !children ? 'nova-button-icon-only' : null,
    primary ? 'nova-button-primary' : null,
  ].filter(Boolean) as string[]

  // 渲染输出
  return (
    <button class={buttonClasses} type="button" data-nova-theme={themeRef.value} {...attrs}>
      {icon && <span class="nova-button-icon">{icon}</span>}
      {children}
    </button>
  )
}

NovaButton.props = novaButtonPropDefs
NovaButton.inheritAttrs = false
NovaButton.displayName = 'NovaButton'

export { NovaButton }
