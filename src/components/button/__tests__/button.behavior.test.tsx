import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { NovaButton } from '../NovaButton'

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

  test('尊重透传的 type 属性', () => {
    const wrapper = mountButton({ type: 'submit' })

    expect(wrapper.get('button').attributes('type')).toBe('submit')
  })

  test('aria 属性会直接透传', () => {
    const wrapper = mountButton({ 'aria-label': 'launch' })

    expect(wrapper.get('button').attributes('aria-label')).toBe('launch')
  })
})
