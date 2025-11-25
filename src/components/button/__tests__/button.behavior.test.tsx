import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { NovaButton } from '../nova-button.tsx'

const mountButton = (attrs?: Record<string, unknown>) => {
  return mount({
    setup() {
      return () => <NovaButton {...attrs}>Action</NovaButton>
    },
  })
}

describe('button behavior', () => {
  test('点击时会触发 onClick 回调', async () => {
    const onClick = vi.fn()
    const wrapper = mountButton({ onClick })

    await wrapper.get('button').trigger('click')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('禁用状态不会触发点击', async () => {
    const onClick = vi.fn()
    const wrapper = mountButton({ onClick, disabled: true })

    await wrapper.get('button').trigger('click')

    expect(onClick).not.toHaveBeenCalled()
  })

  test('默认 type 为 button，避免误触发表单', () => {
    const wrapper = mountButton()

    expect(wrapper.get('button').attributes('type')).toBe('button')
  })
})
