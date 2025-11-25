import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaButton } from '../nova-button.tsx'

const mountButton = (attrs?: Record<string, unknown>) => {
  return mount({
    setup() {
      return () => <NovaButton {...attrs}>Action</NovaButton>
    },
  })
}

describe('button attributes passthrough', () => {
  test('尊重透传的 type 属性', () => {
    const wrapper = mountButton({ type: 'submit' })

    expect(wrapper.get('button').attributes('type')).toBe('submit')
  })

  test('aria 属性会直接透传', () => {
    const wrapper = mountButton({ 'aria-label': 'launch' })

    expect(wrapper.get('button').attributes('aria-label')).toBe('launch')
  })

  test('常规 attribute（如 id、data-*）会透传', () => {
    const wrapper = mountButton({ id: 'primary-action', 'data-track': 'cta' })
    const button = wrapper.get('button')

    expect(button.attributes('id')).toBe('primary-action')
    expect(button.attributes('data-track')).toBe('cta')
  })

  test('ButtonHTMLAttributes 常用字段会透传', () => {
    const wrapper = mountButton({
      name: 'submit-btn',
      value: 'submit',
      form: 'profile-form',
      tabindex: '-1',
    })
    const button = wrapper.get('button')

    expect(button.attributes('name')).toBe('submit-btn')
    expect(button.attributes('value')).toBe('submit')
    expect(button.attributes('form')).toBe('profile-form')
    expect(button.attributes('tabindex')).toBe('-1')
  })

  test('role 与 title 等语义属性同样透传', () => {
    const wrapper = mountButton({ role: 'menuitem', title: '执行操作' })
    const button = wrapper.get('button')

    expect(button.attributes('role')).toBe('menuitem')
    expect(button.attributes('title')).toBe('执行操作')
  })

  test('自定义 class 会与默认类名合并', () => {
    const wrapper = mountButton({ class: 'external-class' })
    const button = wrapper.get('button')

    expect(button.classes()).toContain('nova-button')
    expect(button.classes()).toContain('external-class')
  })

  test('自定义 style 能直接透传', () => {
    const wrapper = mountButton({ style: { color: 'red' } })
    const styleAttr = wrapper.get('button').attributes('style')

    expect(styleAttr).toContain('color: red')
  })
})
