import {
  ButtonHTMLAttributes,
  VNode,
  VNodeProps,
  defineComponent,
  computed,
} from 'vue';
import { vueJsxCompat } from '../../vue-jsx-compat';
import { useEnvironment } from '../../uses/use-environment';
import { VueComponentProps } from '../../types/vue-component';
import {
  environmentProps,
  EnvironmentProps,
} from '../environment/NovaEnvironment';

export interface ButtonProps extends EnvironmentProps {
  primary?: boolean;
  icon?: VNode | string;
}

const buttonProps = {
  ...environmentProps,
  primary: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, String],
    default: null,
  },
};

const NovaButtonImpl = defineComponent({
  name: 'NovaButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const environment = useEnvironment(props as EnvironmentProps);

    // Compute class list based on props and slots
    const classList = computed(() => {
      const children = slots.default?.();
      const icon = slots.icon?.() || props.icon;
      
      return [
        'nova-button',
        { 'nova-button-icon-only': icon && !children },
        { 'nova-button-primary': props.primary },
      ];
    });

    return () => {
      // Support both slot and direct children
      const children = slots.default?.();
      // Icon can come from prop or slot (slot takes priority for backward compatibility)
      const icon = slots.icon?.() || props.icon;

      const renderIcon = () => {
        if (!icon) {
          return null;
        }
        return <span class="nova-button-icon">{icon}</span>;
      };

      const renderChildren = () => {
        if (!children) {
          return null;
        }
        return <span>{children}</span>;
      };

      return (
        <button
          class={classList.value}
          type="button"
          data-nova-theme={environment.themeRef.value}
        >
          {renderIcon()}
          {renderChildren()}
        </button>
      );
    };
  },
});

export const NovaButton = NovaButtonImpl as unknown as {
  new (): {
    $props: VNodeProps & ButtonProps & ButtonHTMLAttributes & VueComponentProps;
  };
};
