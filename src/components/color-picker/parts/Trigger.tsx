import { computed, defineComponent, onMounted, ref, Ref, VNodeProps } from 'vue';
import { Color } from '../color';
import { Environment } from '../../../uses/use-environment';

export interface TriggerProps {
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

export const Trigger = defineComponent({
  name: 'Trigger',
  props: triggerProps,
  emits: ['assignRef'],
  setup(props: TriggerProps, { slots, emit }) {
    const triggerRef: Ref<HTMLElement | null> = ref(null);

    const triggerInnerStyle = computed(() => {
      return {
        backgroundColor: props.color.toCssRgbaString(),
      };
    });

    onMounted(() => {
      emit('assignRef', triggerRef);
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
}) as unknown as {
  new (): {
    $props: VNodeProps & TriggerProps;
  };
};
