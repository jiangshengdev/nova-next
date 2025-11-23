import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { NovaInput } from '../NovaInput'

describe('input basic', () => {
  test('基础态渲染', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <NovaInput />
            <NovaInput disabled />
            <NovaInput readonly />
          </div>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('自定义类名与样式渲染正确', () => {
    const wrapper = mount({
      setup() {
        return () => (
          <div>
            <NovaInput wrapperClass="custom-wrap" class="custom-input" wrapperStyle="color: red;" />
            <NovaInput
              wrapperClass={['custom-wrap', 'is-muted']}
              class={{ 'custom-input': true, focused: true }}
              wrapperStyle={{ background: 'rgba(0, 0, 0, 0.1)' }}
              modelValue="prefill"
            />
          </div>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
