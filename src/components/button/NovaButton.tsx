import { type ButtonHTMLAttributes, type FunctionalComponent, type PropType, type VNode } from 'vue'
import { useEnvironment } from '../../uses/use-environment'
import { environmentProps, type EnvironmentProps } from '../environment/NovaEnvironment'

export interface ButtonProps extends EnvironmentProps {
  primary?: boolean
  icon?: VNode | string
}

const buttonProps = {
  ...environmentProps,
  primary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, String] as PropType<VNode | string>,
    default: null,
  },
}

export type NovaButtonProps = ButtonProps & ButtonHTMLAttributes

const NovaButton: FunctionalComponent<NovaButtonProps> = (props, context) => {
  const environment = useEnvironment(props)

  // 同时支持插槽与直接子节点
  const children = context.slots.default?.()
  // 图标既可以来自插槽也可以来自 props
  const icon = context.slots.icon?.() || props.icon

  // 根据当前内容与属性动态拼装样式
  const classList = [
    'nova-button',
    { 'nova-button-icon-only': icon && !children },
    { 'nova-button-primary': props.primary },
  ]

  const renderIcon = () => {
    if (!icon) {
      return null
    }
    return <span class="nova-button-icon">{icon}</span>
  }

  const renderChildren = () => {
    if (!children) {
      return null
    }
    return <span>{children}</span>
  }

  return (
    <button
      class={classList}
      type="button"
      data-nova-theme={environment.themeRef.value}
      {...context.attrs}
    >
      {renderIcon()}
      {renderChildren()}
    </button>
  )
}

NovaButton.props = buttonProps
NovaButton.inheritAttrs = false
NovaButton.displayName = 'NovaButton'

export { NovaButton }
