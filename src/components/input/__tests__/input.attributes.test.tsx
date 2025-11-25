import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaInput } from '../nova-input.tsx'

const mountInput = (options?: Parameters<typeof mount>[1]) => {
  return mount(NovaInput, options)
}

describe('input attributes passthrough', () => {
  test('自定义 type 会透传到原生 input', () => {
    const wrapper = mountInput({
      attrs: {
        type: 'search',
      },
    })

    expect(wrapper.get('input').attributes('type')).toBe('search')
  })

  test('aria-* 属性会直接透传', () => {
    const wrapper = mountInput({
      attrs: {
        'aria-label': 'search field',
        'aria-describedby': 'hint-id',
      },
    })
    const input = wrapper.get('input')

    expect(input.attributes('aria-label')).toBe('search field')
    expect(input.attributes('aria-describedby')).toBe('hint-id')
  })

  test('常规 attribute（如 id、data-*）会透传', () => {
    const wrapper = mountInput({
      attrs: {
        id: 'search-input',
        'data-track': 'keyword',
        placeholder: '输入关键词',
      },
    })
    const input = wrapper.get('input')

    expect(input.attributes('id')).toBe('search-input')
    expect(input.attributes('data-track')).toBe('keyword')
    expect(input.attributes('placeholder')).toBe('输入关键词')
  })

  test('wrapperClass 支持字符串与数组写法', () => {
    const wrapper = mountInput({
      props: {
        wrapperClass: ['outer-wrap', 'is-focused'],
      },
    })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['nova-input', 'outer-wrap', 'is-focused']),
    )
  })

  test('class 属性会附加至原生 input', () => {
    const wrapper = mountInput({
      props: {
        class: ['custom-input', { active: true }],
      },
    })

    expect(wrapper.get('input').classes()).toEqual(
      expect.arrayContaining(['nova-input-text', 'custom-input', 'active']),
    )
  })

  test('wrapperStyle 支持字符串与对象形式', () => {
    const stringStyleWrapper = mountInput({
      props: {
        wrapperStyle: 'color: red;',
      },
    })
    const objectStyleWrapper = mountInput({
      props: {
        wrapperStyle: {
          background: 'rgba(0, 0, 0, 0.1)',
        },
      },
    })

    expect(stringStyleWrapper.attributes('style')).toContain('color: red;')
    expect(objectStyleWrapper.attributes('style')).toContain('background: rgba(0, 0, 0, 0.1)')
  })

  test('wrapperStyle 允许数组与 false 形式', () => {
    const arrayStyleWrapper = mountInput({
      props: {
        wrapperStyle: [{ margin: '4px' }, 'padding: 8px;'],
      },
    })
    const falsyStyleWrapper = mountInput({
      props: {
        wrapperStyle: false,
      },
    })

    expect(arrayStyleWrapper.attributes('style')).toContain('margin: 4px;')
    expect(arrayStyleWrapper.attributes('style')).toContain('padding: 8px;')
    expect(falsyStyleWrapper.attributes('style')).toBeUndefined()
  })
})
