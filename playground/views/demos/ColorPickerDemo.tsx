import { defineComponent } from 'vue'
import Basic from './color-picker/ColorPickerBasicDemo.tsx'
import Disabled from './color-picker/ColorPickerDisabledDemo.tsx'
import Format from './color-picker/ColorPickerFormatDemo.tsx'
import Preset from './color-picker/ColorPickerPresetDemo.tsx'
import Normal from './color-picker/ColorPickerNormalDemo.tsx'
import Alpha from './color-picker/ColorPickerAlphaDemo.tsx'
import Hsla from './color-picker/ColorPickerHslaDemo.tsx'
import VModel from './color-picker/VModel.tsx'

export default defineComponent({
  setup() {
    return () => {
      return (
        <section>
          <Basic />
          <Disabled />
          <Format />
          <Preset />
          <Normal />
          <Alpha />
          <Hsla />
          <VModel />
        </section>
      )
    }
  },
})
