import { defineComponent, type PropType, type SlotsType, type VNodeChild, provide } from 'vue'
import { languageKey, themeKey } from '@/utils/symbols.ts'
import { useEnvironment } from '@/uses/use-environment.ts'
import { type Language } from '@/types/language.ts'

/**
 * 环境配置属性接口
 */
export interface EnvironmentProps {
  /**
   * 覆盖环境主题，内部同时写入 data-nova-theme
   * @default null
   */
  theme?: string
  /**
   * 覆盖环境语言配置
   * @default null
   */
  language?: Language
}

/**
 * NovaEnvironment 插槽类型
 */
export interface NovaEnvironmentSlots {
  /**
   * 子组件内容
   */
  default?: () => VNodeChild
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

/**
 * 环境配置组件，为子组件提供主题和语言上下文
 */
export const NovaEnvironment = defineComponent({
  name: 'NovaEnvironment',
  props: environmentProps,
  slots: Object as SlotsType<NovaEnvironmentSlots>,
  setup(props, { slots }) {
    const { themeRef, languageRef } = useEnvironment(props)

    provide(themeKey, themeRef)
    provide(languageKey, languageRef)

    return () => {
      return slots.default?.() ?? null
    }
  },
})
