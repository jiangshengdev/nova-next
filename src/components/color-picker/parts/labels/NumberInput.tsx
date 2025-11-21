import { defineComponent, Ref, ref, useAttrs, VNodeProps } from 'vue';
import {
  Direction,
  down,
  FunctionKeys,
  getInputValue,
  setInputValue,
  up,
} from '../../../../utils/dom';
import { UpdateParams } from './label-utils';
import { numberFixed } from '../../../../utils/utils';

interface NumberInputProps {
  value?: string;
  inputRef?: Ref<HTMLElement | null>;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onUpdate?: (params: UpdateParams) => void;
}

const numberInputProps = {
  value: {
    type: String,
    default: '',
  },
  inputRef: {
    type: Object,
    default: null,
  },
};

export const NumberInput = defineComponent({
  name: 'NumberInput',
  props: numberInputProps,
  emits: ['update'],
  inheritAttrs: false,
  setup(props: NumberInputProps, { emit }) {
    const attrs = useAttrs();
    const inputRef: Ref<HTMLElement | null> = ref(null);

    function tuning(functionKeys: FunctionKeys, direction: Direction): void {
      if (!inputRef.value) {
        return;
      }

      const input = inputRef.value as HTMLInputElement;
      const value = getInputValue(input);

      if (!/^-?\d+(\.\d+)?$/.test(value)) {
        return;
      }

      const { alt, shift, ctrl } = functionKeys;
      const originNumber = parseFloat(value);

      let step = 1;
      if (ctrl) {
        step = 100;
      } else if (shift) {
        step = 10;
      } else if (alt) {
        step = 0.1;
      }

      let tunedNumber = originNumber;
      if (direction === up) {
        tunedNumber = originNumber + step;
      } else if (direction === down) {
        tunedNumber = originNumber - step;
      }

      const tunedValue = numberFixed(tunedNumber, 1).toString();

      if (tunedValue === value) {
        return;
      }

      setInputValue(input, tunedValue);
      emit('update', {
        target: input,
        value: tunedValue,
      });
    }

    function onKeydown(e: KeyboardEvent): void {
      const options = {
        alt: e.altKey,
        shift: e.shiftKey,
        ctrl: e.ctrlKey,
      };

      switch (e.key) {
        case 'ArrowUp':
        case 'Up':
          tuning(options, up);
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 'Down':
          tuning(options, down);
          e.preventDefault();
          break;
      }
    }

    return (): JSX.Element => {
      return (
        <div class="nova-color-picker-input">
          <input
            type="text"
            value={props.value}
            ref={inputRef}
            onKeydown={onKeydown}
            {...attrs}
          />
          <div class="nova-color-picker-input-border" />
        </div>
      );
    };
  },
}) as unknown as {
  new (): {
    $props: VNodeProps & NumberInputProps;
  };
};
