import { type InputHTMLAttributes, type FunctionalComponent } from 'vue'
import { useEnvironment } from '../../uses/use-environment'
import { environmentProps, type EnvironmentProps } from '../environment/NovaEnvironment'
import { type VueClass, type VueStyle } from '../../types/props'

interface InputProps extends EnvironmentProps {
  class?: VueClass
  wrapClass?: VueClass
  wrapStyle?: VueStyle
  disabled?: boolean
  readonly?: boolean
  modelValue?: string | number
  'onUpdate:modelValue'?: (value: string) => void
}

const inputProps = {
  ...environmentProps,
  class: {
    type: [String, Array, Object],
    default: null,
  },
  wrapClass: {
    type: [String, Array, Object],
    default: null,
  },
  wrapStyle: {
    type: Object,
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

type NovaInputProps = InputProps & InputHTMLAttributes

const NovaInput: FunctionalComponent<NovaInputProps> = (props, context) => {
  const environment = useEnvironment(props)
  const onInputAttr = context.attrs.onInput as ((event: Event) => void) | undefined
  const attrValue = context.attrs.value as string | number | undefined
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

  const wrapClassList = [
    {
      'nova-input': true,
      'nova-input-disabled': !!props.disabled,
      'nova-input-readonly': !!props.readonly,
    },
    props.wrapClass,
  ]

  const classList = ['nova-input-text', props.class]
  const inputValue = props.modelValue ?? attrValue ?? ''

  return (
    <div class={wrapClassList} style={props.wrapStyle} data-nova-theme={environment.themeRef.value}>
      <input
        type="text"
        class={classList}
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

NovaInput.props = inputProps
NovaInput.emits = ['update:modelValue']
NovaInput.inheritAttrs = false
NovaInput.displayName = 'NovaInput'

export { NovaInput }
export type { NovaInputProps }
