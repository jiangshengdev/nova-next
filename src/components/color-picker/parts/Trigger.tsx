import { computed, defineComponent, onMounted, ref, Ref } from 'vue';
import { Color } from '../color';
import { Environment } from '../../../uses/use-environment';

export interface ColorPickerTriggerProps {
  color: Color;
  disabled: boolean;
  environment: Environment;
  onAssignRef: (ref: Ref<HTMLElement | null>) => void;
}

const triggerProps = {
  color: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  environment: {
    type: Object,
    required: true,
  },
};

export const ColorPickerTrigger = defineComponent({
  name: 'ColorPickerTrigger',
  props: triggerProps,
  emits: ['assignRef'],
  setup(props: ColorPickerTriggerProps, { slots, emit }) {
    const triggerRef: Ref<HTMLElement | null> = ref(null);

    const triggerInnerStyle = computed(() => {
      return {
        backgroundColor: props.color.toCssRgbaString(),
      };
    });

    onMounted(() => {
      emit('assignRef', triggerRef.value);
    });

    return (): JSX.Element => {
      const language = props.environment.languageRef.value.colorPicker;

      let triggerNode = (
        <div
          ref={triggerRef}
          class="nova-color-picker-trigger"
          role="button"
          aria-label={language.aria.trigger}
          tabindex={props.disabled ? -1 : 0}
        >
          <div class="nova-color-picker-trigger-inner">
            <div
              class="nova-color-picker-trigger-bg"
              style={triggerInnerStyle.value}
            />
          </div>
        </div>
      );
      const children = slots.default;
      if (children) {
        const slotNodes = children();
        triggerNode = slotNodes[0] ?? triggerNode;
      }

      return triggerNode;
    };
  },
});
