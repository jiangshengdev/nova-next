import { defineComponent, reactive } from 'vue'
import { NovaButton, NovaColorPicker } from '../../../index'
import { type ColorFormat } from '@/components/color-picker/color.ts'

export default defineComponent({
  setup() {
    const defaultColor = 'hsla(180, 50%, 50%, 0.5)'
    const state = reactive({
      color: defaultColor,
    })

    function onReset(): void {
      state.color = defaultColor
    }

    function onUpdate(color: string): void {
      state.color = color
    }

    return () => {
      const pickerProps = {
        value: state.color,
        format: 'hsl' as ColorFormat,
        alpha: true,
        onUpdate,
      }

      return (
        <div>
          <div>
            {state.color}
            <NovaButton onClick={onReset}>{() => 'Reset'}</NovaButton>
          </div>
          <NovaColorPicker {...pickerProps} />
        </div>
      )
    }
  },
})
