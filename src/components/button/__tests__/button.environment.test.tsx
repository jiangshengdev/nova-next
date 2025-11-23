import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaButton } from '../NovaButton'
import { NovaEnvironment } from '../../environment'

describe('button environment integration', () => {
  test('默认主题为 light', () => {
    const wrapper = mount(() => <NovaButton>Default</NovaButton>)

    expect(wrapper.get('button').attributes('data-nova-theme')).toBe('light')
  })

  test('theme 属性优先级高于环境注入', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark">
        <NovaButton theme="light">Light</NovaButton>
      </NovaEnvironment>
    ))

    expect(wrapper.get('button').attributes('data-nova-theme')).toBe('light')
  })

  test('可继承 NovaEnvironment 提供的主题', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark">
        <NovaButton>Dark</NovaButton>
      </NovaEnvironment>
    ))

    expect(wrapper.get('button').attributes('data-nova-theme')).toBe('dark')
  })
})
