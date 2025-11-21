import { FunctionalComponent, PropType, VNodeProps } from 'vue';
import { Color } from '../color';

interface PresetValuesProps {
  color: Color;
  preset: string[];
  onSelect?: (color: Color) => void;
}

const presetValuesProps = {
  color: {
    type: Object as PropType<Color>,
    required: true,
  },
  preset: {
    type: Array as PropType<string[]>,
    required: true,
  },
};

const PresetValuesImpl: FunctionalComponent<PresetValuesProps> = (
  props,
  context
) => {
  const { emit, slots } = context;

  function selectPreset(hex: string): void {
    const color = Color.parse(hex);
    emit('select', color);
  }

  function createPreset(color: string) {
    const presetHex = Color.parse(color).toCssHexString();
    const panelHex = props.color.toCssHexString();
    const selected = presetHex === panelHex;
    const classList = [
      'nova-color-picker-preset',
      {
        ['nova-color-picker-preset-selected']: selected,
      },
    ];

    function onClick(): void {
      selectPreset(color);
    }

    return (
      <div class={classList} onClick={onClick}>
        <div
          class="nova-color-picker-preset-inner"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    );
  }

  let presetNode = (
    <div class="nova-color-picker-preset-list">
      {props.preset.map((value) => createPreset(value as string))}
    </div>
  );

  const children = slots.default;
  if (children) {
    const slotNodes = children();
    presetNode = slotNodes[0] ?? presetNode;
  }

  return <div class="nova-color-picker-preset-wrap">{presetNode}</div>;
};

PresetValuesImpl.props = presetValuesProps;
PresetValuesImpl.emits = ['select'];

export const PresetValues = PresetValuesImpl as unknown as {
  new (): {
    $props: VNodeProps & PresetValuesProps;
  };
};
