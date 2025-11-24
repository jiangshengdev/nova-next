import {
  type InputHTMLAttributes,
  type FunctionalComponent,
  type PropType,
  type ComponentObjectPropsOptions,
} from 'vue'
import { useEnvironment } from '@/uses/use-environment.ts'
import { environmentProps, type EnvironmentProps } from '../environment/NovaEnvironment'
import { type VueClass, type VueStyle } from '@/types/props.ts'

interface NovaInputBaseProps extends EnvironmentProps {
  class?: VueClass
  wrapperClass?: VueClass
  wrapperStyle?: VueStyle
  disabled?: boolean
  readonly?: boolean
  modelValue?: string
  'onUpdate:modelValue'?: (value: string) => void
}

const novaInputPropDefs: ComponentObjectPropsOptions<NovaInputProps> = {
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

type NovaInputProps = NovaInputBaseProps & InputHTMLAttributes

const NovaInput: FunctionalComponent<NovaInputProps> = (props, { attrs, emit }) => {
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
    disabled: !!disabled,
    readonly: !!readonly,
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
NovaInput.inheritAttrs = false
NovaInput.displayName = 'NovaInput'

export { NovaInput }
export type { NovaInputProps }
