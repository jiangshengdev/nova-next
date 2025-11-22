import { type InputHTMLAttributes, type FunctionalComponent } from 'vue';
import { useEnvironment } from '../../uses/use-environment';
import {
  environmentProps,
  type EnvironmentProps,
} from '../environment/NovaEnvironment';
import { type VueClass, type VueStyle } from '../../types/props';

interface InputProps extends EnvironmentProps {
  class?: VueClass;
  wrapClass?: VueClass;
  wrapStyle?: VueStyle;
  disabled?: boolean;
  readonly?: boolean;
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
};

type NovaInputProps = InputProps & InputHTMLAttributes;

const NovaInput: FunctionalComponent<NovaInputProps> = (props, context) => {
  const environment = useEnvironment(props);

  const wrapClassList = [
    {
      'nova-input': true,
      'nova-input-disabled': !!props.disabled,
      'nova-input-readonly': !!props.readonly,
    },
    props.wrapClass,
  ];

  const classList = ['nova-input-text', props.class];

  return (
    <div
      class={wrapClassList}
      style={props.wrapStyle}
      data-nova-theme={environment.themeRef.value}
    >
      <input
        type="text"
        class={classList}
        {...context.attrs}
        disabled={!!props.disabled}
        readonly={!!props.readonly}
      />
      <div class="nova-input-border" />
    </div>
  );
};

NovaInput.props = inputProps;
NovaInput.inheritAttrs = false;
NovaInput.displayName = 'NovaInput';

export { NovaInput };
