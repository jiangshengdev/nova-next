import { computed, defineComponent, type PropType, provide } from 'vue';
import { languageKey, themeKey } from '../../utils/symbols';
import { languageDefault, themeDefault } from '../../uses/use-environment';
import { type Language } from '../../types/language.ts';

export interface EnvironmentProps {
  theme?: string;
  language?: Language;
}

export const environmentProps = {
  theme: {
    type: String,
    default: null,
  },
  language: {
    type: Object as PropType<Language>,
    default: null,
  },
};

export const NovaEnvironment = defineComponent({
  name: 'NovaEnvironment',
  props: environmentProps,
  setup(props, { slots }) {
    const themeRef = computed(() => props.theme ?? themeDefault);
    const languageRef = computed(() => props.language ?? languageDefault);

    provide(themeKey, themeRef);
    provide(languageKey, languageRef);

    return () => {
      return slots.default?.() ?? null;
    };
  },
});
