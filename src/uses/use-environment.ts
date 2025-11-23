import { computed, inject, type Ref, ref, toRef } from 'vue'
import { languageKey, themeKey } from '../utils/symbols'
import { type Language } from '../types/language'
import { enUS } from '@/environments/languages'
import { type EnvironmentProps } from '../components/environment/NovaEnvironment'

export const fallbackTheme = 'light'
export const fallbackLanguage = enUS

export type EnvironmentContext = { languageRef: Ref<Language>; themeRef: Ref<string> }

export function useEnvironment(props?: EnvironmentProps): EnvironmentContext {
  const themeOverride = props ? toRef(props, 'theme') : undefined
  const languageOverride = props ? toRef(props, 'language') : undefined

  const injectedTheme = inject(themeKey, ref(fallbackTheme))
  const injectedLanguage = inject(languageKey, ref(fallbackLanguage))

  const themeRef = computed(() => {
    return themeOverride?.value ?? injectedTheme.value ?? fallbackTheme
  })

  const languageRef = computed(() => {
    return languageOverride?.value ?? injectedLanguage.value ?? fallbackLanguage
  })

  return {
    themeRef,
    languageRef,
  }
}
