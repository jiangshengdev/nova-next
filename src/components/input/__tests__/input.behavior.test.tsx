import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, test, vi } from 'vitest'
import { NovaInput } from '../NovaInput'

describe('input behavior', () => {
  test('v-model 会与输入值保持同步', async () => {
    const modelValue = ref('hello')
    const wrapper = mount(
      defineComponent({
        name: 'InputModelWrapper',
        setup() {
          const updateValue = (value: string) => {
            modelValue.value = value
          }

          return () => (
            <NovaInput
              {...{
                modelValue: modelValue.value,
                'onUpdate:modelValue': updateValue,
              }}
            />
          )
        },
      }),
    )

    await wrapper.get('input').setValue('world')

    expect(modelValue.value).toBe('world')
  })

  test('用户提供的 onInput 会被调用', async () => {
    const onInput = vi.fn()
    const wrapper = mount(NovaInput, {
      props: {
        onInput,
      },
    })

    await wrapper.get('input').setValue('nova')

    expect(onInput).toHaveBeenCalledTimes(1)
  })

  test('wrapperStyle 支持字符串形式', () => {
    const wrapper = mount(NovaInput, {
      props: {
        wrapperStyle: 'color: red;',
      },
    })

    expect(wrapper.attributes('style')).toContain('color: red;')
  })

  test('aria 属性会透传到原生 input', () => {
    const wrapper = mount(NovaInput, {
      attrs: {
        'aria-label': 'search',
      },
    })

    expect(wrapper.get('input').attributes('aria-label')).toBe('search')
  })

  test('value 属性可作为 modelValue 兜底', () => {
    const wrapper = mount(() => <NovaInput value="from-attr" />)

    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('from-attr')
  })

  test('class 与 wrapperClass 会应用到对应元素', () => {
    const wrapper = mount(NovaInput, {
      props: {
        wrapperClass: ['custom-wrap', 'is-focused'],
        class: 'custom-input',
      },
    })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['nova-input', 'custom-wrap', 'is-focused']),
    )
    expect(wrapper.get('input').classes()).toContain('custom-input')
  })
})
