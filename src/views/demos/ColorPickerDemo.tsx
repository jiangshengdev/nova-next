import { defineComponent } from 'vue'
import Normal from './color-picker/ColorPickerNormalDemo.tsx'
import Alpha from './color-picker/ColorPickerAlphaDemo.tsx'
import Hsla from './color-picker/ColorPickerHslaDemo.tsx'
import VModel from './color-picker/VModel'

export default defineComponent({
  setup() {
    return () => {
      return (
        <section>
          <Normal />
          <Alpha />
          <Hsla />
          <VModel />
        </section>
      )
    }
  },
})
