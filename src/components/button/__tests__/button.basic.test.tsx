import { mount } from '@vue/test-utils'
import { NovaButton } from '../NovaButton'
import { describe, expect, test } from 'vitest'

describe('button', () => {
  test('render', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return (
            <div>
              <NovaButton>Button</NovaButton>
              <NovaButton primary>Primary</NovaButton>
              <NovaButton disabled>Disabled</NovaButton>
            </div>
          )
        }
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render with icon prop', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return (
            <div>
              <NovaButton icon="🚀">Launch</NovaButton>
              <NovaButton icon={<span>Icon</span>}>With Icon</NovaButton>
              <NovaButton icon="⭐" />
            </div>
          )
        }
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('render with slot icon (backward compatibility)', () => {
    const wrapper = mount({
      setup() {
        return () => {
          return (
            <div>
              <NovaButton>{{ icon: () => '🚀', default: () => 'Launch' }}</NovaButton>
              <NovaButton>{{ icon: () => '⭐' }}</NovaButton>
            </div>
          )
        }
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
