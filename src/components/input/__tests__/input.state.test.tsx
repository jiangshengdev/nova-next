import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaInput } from '../nova-input.tsx'

describe('input state styles', () => {
  test('disabled 会添加类名与 aria 属性', () => {
    const wrapper = mount(() => <NovaInput disabled />)
    const root = wrapper.get('.nova-input')
    const input = wrapper.get('input')

    expect(root.classes()).toContain('nova-input-disabled')
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('aria-disabled')).toBe('true')
    expect(input.attributes('aria-readonly')).toBeUndefined()
  })

  test('readonly 会添加对应类名与 aria 属性', () => {
    const wrapper = mount(() => <NovaInput readonly />)
    const root = wrapper.get('.nova-input')
    const input = wrapper.get('input')

    expect(root.classes()).toContain('nova-input-readonly')
    expect(input.attributes('readonly')).toBeDefined()
    expect(input.attributes('aria-readonly')).toBe('true')
    expect(input.attributes('aria-disabled')).toBeUndefined()
  })

  test('同时 disabled 与 readonly 会保留两种语义', () => {
    const wrapper = mount(() => <NovaInput disabled readonly />)
    const root = wrapper.get('.nova-input')
    const input = wrapper.get('input')

    expect(root.classes()).toEqual(
      expect.arrayContaining(['nova-input-disabled', 'nova-input-readonly']),
    )
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.attributes('readonly')).toBeDefined()
    expect(input.attributes('aria-disabled')).toBe('true')
    expect(input.attributes('aria-readonly')).toBe('true')
  })
})
