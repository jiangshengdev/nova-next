import {
  type ComponentPropsOptions,
  type FunctionalComponent,
  type InputHTMLAttributes,
  type PropType,
  type SlotsType,
} from 'vue'
import {
  environmentProps,
  type EnvironmentProps,
} from '@/components/environment/NovaEnvironment.tsx'
import { useEnvironment } from '@/uses/use-environment.ts'
import { type VueClass, type VueStyle } from '@/types/props.ts'

/**
 * NovaInput 基础属性接口
 * @extends EnvironmentProps
 */
interface NovaInputBaseProps extends EnvironmentProps {
  /**
   * 作用于原生 input 的类名
   * @default null
   */
  class?: VueClass
  /**
   * 自定义最外层容器类名
   * @default null
   */
  wrapperClass?: VueClass
  /**
   * 自定义容器内联样式
   * @default null
   */
  wrapperStyle?: VueStyle
  /**
   * 禁用输入框
   * @default false
   */
  disabled?: boolean
  /**
   * 只读模式
   * @default false
   */
  readonly?: boolean
  /**
   * 受控输入值
   * @default null
   */
  modelValue?: string
  'onUpdate:modelValue'?: (value: string) => void
}

const novaInputPropDefs: ComponentPropsOptions<NovaInputProps> = {
  ...environmentProps,
  class: {
    type: [String, Array, Object] as PropType<VueClass>,
    default: null,
  },
  wrapperClass: {
    type: [String, Array, Object] as PropType<VueClass>,
    default: null,
  },
  wrapperStyle: {
    type: [String, Array, Object, Boolean] as PropType<VueStyle>,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: null,
  },
}

/**
 * NovaInput 完整属性类型
 */
type NovaInputProps = NovaInputBaseProps & InputHTMLAttributes

/**
 * NovaInput 插槽类型
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NovaInputSlots {}

/**
 * NovaInput 事件类型
 */
type NovaInputEmits = ['update:modelValue']

/**
 * 语义化文本输入组件，保持与原生 input 相同的属性与行为
 */
const NovaInput: FunctionalComponent<NovaInputProps, NovaInputEmits, NovaInputSlots> = (
  props,
  { attrs, emit },
) => {
  // 环境上下文
  const { themeRef } = useEnvironment(props)
  const { class: inputClass, wrapperClass, wrapperStyle, disabled, readonly, modelValue } = props

  const {
    onInput: onInputAttr,
    value: fallbackModelValue,
    type: inputTypeAttr,
    ...nativeInputAttrs
  } = attrs as InputHTMLAttributes

  // 内容计算
  const inputValue = modelValue ?? (fallbackModelValue as string | undefined) ?? ''
  const inputType = typeof inputTypeAttr === 'string' ? inputTypeAttr : 'text'

  const wrapperClasses = [
    'nova-input',
    disabled && 'nova-input-disabled',
    readonly && 'nova-input-readonly',
    wrapperClass,
  ].filter(Boolean) as VueClass

  const inputClasses = ['nova-input-text', inputClass].filter(Boolean) as VueClass

  const handleInput = (event: InputEvent) => {
    if (disabled || readonly) {
      return
    }

    const target = event.target as HTMLInputElement
    const nextValue = target.value

    emit?.('update:modelValue', nextValue)

    if (typeof onInputAttr === 'function') {
      onInputAttr(event)
    }
  }

  // 渲染输出
  const inputProps: InputHTMLAttributes = {
    type: inputType,
    class: inputClasses,
    ...nativeInputAttrs,
    value: inputValue,
    onInput: handleInput,
    disabled: Boolean(disabled),
    readonly: Boolean(readonly),
    'aria-disabled': disabled || undefined,
    'aria-readonly': readonly || undefined,
  }

  return (
    <div class={wrapperClasses} style={wrapperStyle} data-nova-theme={themeRef.value}>
      <input {...inputProps} />
      <div class="nova-input-border" />
    </div>
  )
}

NovaInput.props = novaInputPropDefs
NovaInput.emits = ['update:modelValue']
NovaInput.slots = Object as SlotsType<NovaInputSlots>
NovaInput.inheritAttrs = false
NovaInput.displayName = 'NovaInput'

export { NovaInput }
export type { NovaInputProps }
