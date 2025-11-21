import {
  ButtonHTMLAttributes,
  FunctionalComponent,
  VNode,
  VNodeProps,
} from 'vue';
import { vueJsxCompat } from '../../vue-jsx-compat';
import { useEnvironment } from '../../uses/use-environment';
import { VueComponentProps } from '../../types/vue-component';
import { EnvironmentProps } from '../environment/NovaEnvironment';

export interface ButtonProps extends EnvironmentProps {
  primary?: boolean;
  icon?: VNode | string;
}

const NovaButtonImpl: FunctionalComponent<ButtonProps> = (props, { slots, attrs }) => {
  const environment = useEnvironment(props as EnvironmentProps);

  // Support both slot and direct children
  const children = slots.default?.();
  // Icon can come from prop or slot (slot takes priority for backward compatibility)
  const icon = slots.icon?.() || props.icon;

  // Compute class list based on props and current slot content
  const classList = [
    'nova-button',
    { 'nova-button-icon-only': icon && !children },
    { 'nova-button-primary': props.primary },
  ];

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
      {...attrs}
      class={classList}
      type="button"
      data-nova-theme={environment.themeRef.value}
    >
      {renderIcon()}
      {renderChildren()}
    </button>
  );
};

NovaButtonImpl.props = ['theme', 'language', 'primary', 'icon'];
NovaButtonImpl.displayName = 'NovaButton';

export const NovaButton = NovaButtonImpl as unknown as {
  new (): {
    $props: VNodeProps & ButtonProps & ButtonHTMLAttributes & VueComponentProps;
  };
};
