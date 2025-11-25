import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaButton } from '../nova-button.tsx'

describe('button state styles', () => {
  test('primary 属性会添加主按钮类名', () => {
    const wrapper = mount(() => <NovaButton primary>Primary</NovaButton>)
    const classes = wrapper.get('button').classes()

    expect(classes).toContain('nova-button-primary')
  })

  test('仅有图标时会使用 icon-only 类名', () => {
    const wrapper = mount(() => <NovaButton icon="🚀" />)
    const classes = wrapper.get('button').classes()

    expect(classes).toContain('nova-button-icon-only')
  })

  test('同时有图标与文本时不会使用 icon-only 类名', () => {
    const wrapper = mount(() => <NovaButton icon="🚀">Launch</NovaButton>)
    const classes = wrapper.get('button').classes()

    expect(classes).not.toContain('nova-button-icon-only')
  })
})
