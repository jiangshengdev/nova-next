import { defineComponent, type PropType, provide } from 'vue'
import { languageKey, themeKey } from '@/utils/symbols.ts'
import { useEnvironment } from '@/uses/use-environment.ts'
import { type Language } from '@/types/language.ts'

/**
 * 环境配置属性接口
 */
export interface EnvironmentProps {
  /**
   * 覆盖环境主题，内部同时写入 data-nova-theme
   */
  theme?: string
  /**
   * 覆盖环境语言配置
   */
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
