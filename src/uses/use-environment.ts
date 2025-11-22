import { computed, inject, type Ref, ref, toRef } from 'vue';
import { languageKey, themeKey } from '../utils/symbols';
import { type Language } from '../types/language';
import { enUS } from '../environments/languages';
import { type EnvironmentProps } from '../components/environment/NovaEnvironment';

export const themeDefault = 'light';
export const languageDefault = enUS;

export type Environment = { languageRef: Ref<Language>; themeRef: Ref<string> };

export function useEnvironment(props?: EnvironmentProps): Environment {
  const themeOverride = props ? toRef(props, 'theme') : undefined;
  const languageOverride = props ? toRef(props, 'language') : undefined;

  const injectedTheme = inject(themeKey, ref(themeDefault));
  const injectedLanguage = inject(languageKey, ref(languageDefault));

  const themeRef = computed(() => {
    return themeOverride?.value ?? injectedTheme.value ?? themeDefault;
  });

  const languageRef = computed(() => {
    return languageOverride?.value ?? injectedLanguage.value ?? languageDefault;
  });

  return {
    themeRef,
    languageRef,
  };
}
