import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaInput } from '../nova-input.tsx'
import { NovaEnvironment } from '../../environment'

describe('input environment integration', () => {
  test('默认主题为 light', () => {
    const wrapper = mount(() => <NovaInput />)

    expect(wrapper.get('.nova-input').attributes('data-nova-theme')).toBe('light')
  })

  test('可以继承 NovaEnvironment 提供的主题', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark">
        <NovaInput />
      </NovaEnvironment>
    ))

    expect(wrapper.get('.nova-input').attributes('data-nova-theme')).toBe('dark')
  })

  test('theme 属性优先于环境注入', () => {
    const wrapper = mount(() => (
      <NovaEnvironment theme="dark">
        <NovaInput theme="light" />
      </NovaEnvironment>
    ))

    expect(wrapper.get('.nova-input').attributes('data-nova-theme')).toBe('light')
  })
})
