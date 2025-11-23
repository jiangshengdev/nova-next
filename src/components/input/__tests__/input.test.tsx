import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { NovaInput } from '../NovaInput'
import { describe, test, expect, vi } from 'vitest'

describe('input', () => {
  test('render', () => {
    const RenderWrapper = defineComponent({
      name: 'InputRenderWrapper',
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

    const wrapper = mount(RenderWrapper)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('v-model syncs value', async () => {
    const wrapper = mount(
      defineComponent({
        name: 'InputModelWrapper',
        setup() {
          const valueRef = ref('hello')
          const updateValue = (value: string) => {
            valueRef.value = value
          }

          return () => (
            <NovaInput
              {...{
                modelValue: valueRef.value,
                'onUpdate:modelValue': updateValue,
              }}
            />
          )
        },
      }),
    )

    const input = wrapper.get('input')
    await input.setValue('world')
    expect(wrapper.html()).toContain('value="world"')
  })

  test('user onInput handler still fires', async () => {
    const onInput = vi.fn()
    const wrapper = mount(NovaInput, {
      props: {
        onInput,
      },
    })

    await wrapper.get('input').setValue('nova')
    expect(onInput).toHaveBeenCalled()
  })
})
