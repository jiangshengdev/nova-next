import { defineComponent, type PropType, provide } from 'vue'
import { languageKey, themeKey } from '@/utils/symbols.ts'
import { useEnvironment } from '@/uses/use-environment.ts'
import { type Language } from '@/types/language.ts'

export interface EnvironmentProps {
  theme?: string
  language?: Language
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
}

export const NovaEnvironment = defineComponent({
  name: 'NovaEnvironment',
  props: environmentProps,
  setup(props, { slots }) {
    const { themeRef, languageRef } = useEnvironment(props)

    provide(themeKey, themeRef)
    provide(languageKey, languageRef)

    return () => {
      return slots.default?.() ?? null
    }
  },
})
