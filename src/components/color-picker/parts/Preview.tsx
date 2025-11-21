import { FunctionalComponent, PropType, VNodeProps } from 'vue';
import { Color } from '../color';

interface PreviewProps {
  color: Color;
  value: string;
  onReset?: () => void;
}

const previewProps = {
  color: {
    type: Object as PropType<Color>,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
};

const PreviewImpl: FunctionalComponent<PreviewProps> = (props, context) => {
  const { emit } = context;

  function onPrevClick(): void {
    emit('reset');
  }

  const prevColor = Color.parse(props.value).toCssRgbaString();
  const currColor = props.color.toCssRgbaString();
  const prevStyle = {
    backgroundColor: prevColor,
  };
  const currStyle = {
    backgroundColor: currColor,
  };

  return (
    <div class="nova-color-picker-preview">
      <div class="nova-color-picker-preview-fill-left" />
      <div class="nova-color-picker-preview-fill-right" />
      <div
        class="nova-color-picker-preview-prev"
        style={prevStyle}
        onClick={onPrevClick}
      />
      <div class="nova-color-picker-preview-curr" style={currStyle} />
    </div>
  );
};

PreviewImpl.props = previewProps;
PreviewImpl.emits = ['reset'];

export const Preview = PreviewImpl as unknown as {
  new (): {
    $props: VNodeProps & PreviewProps;
  };
};
