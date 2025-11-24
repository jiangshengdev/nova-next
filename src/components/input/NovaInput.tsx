import { type InputHTMLAttributes, type FunctionalComponent, type PropType } from 'vue'
import { useEnvironment } from '@/uses/use-environment.ts'
import { environmentProps, type EnvironmentProps } from '../environment/NovaEnvironment'
import { type VueClass, type VueStyle } from '@/types/props.ts'

interface NovaInputBaseProps extends EnvironmentProps {
  class?: VueClass
  wrapperClass?: VueClass
  wrapperStyle?: VueStyle
  disabled?: boolean
  readonly?: boolean
  modelValue?: string | number
  'onUpdate:modelValue'?: (value: string | number) => void
}

const novaInputPropDefs = {
  ...environmentProps,
  class: {
    type: [String, Array, Object],
    default: null,
  },
  wrapperClass: {
    type: [String, Array, Object],
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
    type: [String, Number],
    default: null,
  },
}

type NovaInputProps = NovaInputBaseProps & InputHTMLAttributes

type ModelValueLike = string | number | undefined

const formatInputValue = (value: ModelValueLike) => {
  if (typeof value === 'number') {
    return String(value)
  }
  return value ?? ''
}

const resolveNextModelValue = (input: HTMLInputElement, reference: ModelValueLike) => {
  if (typeof reference === 'number') {
    const numericValue = Number.isNaN(input.valueAsNumber)
      ? Number(input.value)
      : input.valueAsNumber
    return numericValue
  }

  return input.value
}

const NovaInput: FunctionalComponent<NovaInputProps> = (props, { attrs, emit }) => {
  // 环境上下文
  const { themeRef } = useEnvironment(props)
  const { class: fieldClass, wrapperClass, wrapperStyle, disabled, readonly, modelValue } = props

  const {
    onInput: onInputAttrRaw,
    value: fallbackModelValue,
    type: inputTypeAttr,
    ...nativeInputAttrs
  } = attrs as typeof attrs & {
    onInput?: ((event: Event) => void) | undefined
    value?: ModelValueLike
    type?: string
  }

  const onInputAttr = onInputAttrRaw as ((event: Event) => void) | undefined

  // 内容计算
  const readReferenceValue = () => modelValue ?? fallbackModelValue
  const referenceValue = readReferenceValue()
  const inputValue = formatInputValue(referenceValue)
  const inputType = typeof inputTypeAttr === 'string' ? inputTypeAttr : 'text'

  const wrapperClasses = (
    [
      'nova-input',
      disabled && 'nova-input-disabled',
      readonly && 'nova-input-readonly',
      wrapperClass,
    ] as Array<string | VueClass | false | null>
  ).filter(Boolean) as Array<string | VueClass>

  const fieldClasses = (['nova-input-text', fieldClass] as Array<string | VueClass | null>).filter(
    Boolean,
  ) as Array<string | VueClass>

  const handleInput = (event: Event) => {
    if (disabled || readonly) {
      return
    }

    const target = event.target as HTMLInputElement
    const nextValue = resolveNextModelValue(target, readReferenceValue())

    emit?.('update:modelValue', nextValue)
    if (typeof onInputAttr === 'function') {
      onInputAttr(event)
    }
  }

  // 渲染输出
  const inputProps = {
    type: inputType,
    class: fieldClasses,
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
