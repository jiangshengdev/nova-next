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
          const updateValue = (value: string | number) => {
            modelValue.value = String(value)
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

  test('value 属性可作为 modelValue 兜底', () => {
    const wrapper = mount(() => <NovaInput value="from-attr" />)

    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('from-attr')
  })

  test('数字模型会保持 number 类型', async () => {
    const modelValue = ref<string | number>(1)
    const updateValue = (value: string | number) => {
      modelValue.value = value
    }

    const wrapper = mount(
      defineComponent({
        name: 'NumericModelWrapper',
        setup() {
          return () => (
            <NovaInput
              type="number"
              {...{
                modelValue: modelValue.value,
                'onUpdate:modelValue': updateValue,
              }}
            />
          )
        },
      }),
    )

    await wrapper.get('input').setValue('42')

    expect(modelValue.value).toBe(42)
    expect(typeof modelValue.value).toBe('number')
  })

  test('数字模型在清空时返回空字符串', async () => {
    const modelValue = ref<string | number>(5)
    const updateValue = (value: string | number) => {
      modelValue.value = value
    }

    const wrapper = mount(
      defineComponent({
        name: 'NumericModelClearWrapper',
        setup() {
          return () => (
            <NovaInput
              type="number"
              {...{
                modelValue: modelValue.value,
                'onUpdate:modelValue': updateValue,
              }}
            />
          )
        },
      }),
    )

    await wrapper.get('input').setValue('')

    expect(modelValue.value).toBe('')
  })
})
