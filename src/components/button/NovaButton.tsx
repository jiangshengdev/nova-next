import {
  type ButtonHTMLAttributes,
  type FunctionalComponent,
  type PropType,
  type VNodeChild,
} from 'vue'
import { useEnvironment } from '@/uses/use-environment.ts'
import { environmentProps, type EnvironmentProps } from '../environment/NovaEnvironment'

export interface NovaButtonBaseProps extends EnvironmentProps {
  primary?: boolean
  icon?: VNodeChild
}

const novaButtonPropDefs = {
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

export type NovaButtonProps = NovaButtonBaseProps & ButtonHTMLAttributes

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
