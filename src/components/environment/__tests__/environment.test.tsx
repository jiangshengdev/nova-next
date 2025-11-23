import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaEnvironment } from '../NovaEnvironment'
import { fallbackLanguage, fallbackTheme, useEnvironment } from '../../../uses/use-environment'
import { enUS, zhCN } from '../../../environments/languages'

const EnvProbe = defineComponent({
  name: 'EnvProbe',
  setup() {
    const { themeRef, languageRef } = useEnvironment()

    return () => (
      <div
        data-environment-language={languageRef.value.name}
        data-environment-theme={themeRef.value}
      >
        {languageRef.value.colorPicker.aria.trigger}
      </div>
    )
  },
})

describe('NovaEnvironment', () => {
  test('默认提供 fallback 主题与语言', () => {
    const wrapper = mount(() => (
      <NovaEnvironment>
        <EnvProbe />
      </NovaEnvironment>
    ))

    const probe = wrapper.get('[data-environment-theme]')
    expect(probe.attributes('data-environment-theme')).toBe(fallbackTheme)
    expect(probe.attributes('data-environment-language')).toBe(fallbackLanguage.name)
    expect(probe.text()).toBe(fallbackLanguage.colorPicker.aria.trigger)
  })

  test('props 可覆盖主题与语言', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark" language={zhCN}>
        <EnvProbe />
      </NovaEnvironment>
    ))

    const probe = wrapper.get('[data-environment-theme]')
    expect(probe.attributes('data-environment-theme')).toBe('dark')
    expect(probe.attributes('data-environment-language')).toBe(zhCN.name)
    expect(probe.text()).toBe(zhCN.colorPicker.aria.trigger)
  })

  test('嵌套时可继承父级环境', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark" language={zhCN}>
        <NovaEnvironment>
          <EnvProbe />
        </NovaEnvironment>
      </NovaEnvironment>
    ))

    const probe = wrapper.get('[data-environment-theme]')
    expect(probe.attributes('data-environment-theme')).toBe('dark')
    expect(probe.attributes('data-environment-language')).toBe(zhCN.name)
  })

  test('子级仅覆盖语言时仍可继承主题', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark" language={zhCN}>
        <NovaEnvironment language={enUS}>
          <EnvProbe />
        </NovaEnvironment>
      </NovaEnvironment>
    ))

    const probe = wrapper.get('[data-environment-theme]')
    expect(probe.attributes('data-environment-theme')).toBe('dark')
    expect(probe.attributes('data-environment-language')).toBe(enUS.name)
  })

  test('响应式 props 变更会同步给后代', async () => {
    const theme = ref('light')
    const language = ref(zhCN)

    const wrapper = mount(() => (
      <NovaEnvironment theme={theme.value} language={language.value}>
        <EnvProbe />
      </NovaEnvironment>
    ))

    const probe = () => wrapper.get('[data-environment-theme]')

    expect(probe().attributes('data-environment-theme')).toBe('light')
    expect(probe().attributes('data-environment-language')).toBe(zhCN.name)

    theme.value = 'dark'
    language.value = enUS
    await nextTick()

    expect(probe().attributes('data-environment-theme')).toBe('dark')
    expect(probe().attributes('data-environment-language')).toBe(enUS.name)
  })
})
