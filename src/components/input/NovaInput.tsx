import { type InputHTMLAttributes, type FunctionalComponent } from 'vue'
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
  'onUpdate:modelValue'?: (value: string) => void
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
    type: [String, Object],
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

const NovaInput: FunctionalComponent<NovaInputProps> = (props, context) => {
  const environment = useEnvironment(props)
  const onInputAttr = context.attrs.onInput as ((event: Event) => void) | undefined
  const fallbackModelValue = context.attrs.value as string | number | undefined
  const inputAttrs = { ...context.attrs } as Record<string, unknown>

  delete inputAttrs.onInput
  delete inputAttrs.value

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    context.emit?.('update:modelValue', target.value)
    if (typeof onInputAttr === 'function') {
      onInputAttr(event)
    }
  }

  const inputWrapperClasses = [
    {
      'nova-input': true,
      'nova-input-disabled': !!props.disabled,
      'nova-input-readonly': !!props.readonly,
    },
    props.wrapperClass,
  ]

  const fieldClasses = ['nova-input-text', props.class]
  const inputValue = props.modelValue ?? fallbackModelValue ?? ''

  return (
    <div
      class={inputWrapperClasses}
      style={props.wrapperStyle}
      data-nova-theme={environment.themeRef.value}
    >
      <input
        type="text"
        class={fieldClasses}
        {...inputAttrs}
        value={inputValue}
        onInput={handleInput}
        disabled={!!props.disabled}
        readonly={!!props.readonly}
      />
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
