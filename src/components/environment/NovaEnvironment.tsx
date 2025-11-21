import { defineComponent, PropType, provide, ref, watch } from 'vue';
import { languageKey, themeKey } from '../../utils/symbols';
import { languageDefault, themeDefault } from '../../uses/use-environment';
import { Language } from '../../types/language';

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
    const themeRef = props.theme ? ref(props.theme) : ref(themeDefault);
    const languageRef = props.language
      ? ref(props.language)
      : ref(languageDefault);

    provide(themeKey, themeRef);
    provide(languageKey, languageRef);

    watch(
      () => props.theme,
      (theme) => {
        themeRef.value = theme || themeDefault;
      }
    );

    watch(
      () => props.language,
      (language) => {
        languageRef.value = language || languageDefault;
      }
    );

    return () => {
      return slots.default?.() ?? null;
    };
  },
});
