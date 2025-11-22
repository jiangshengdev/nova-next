import { defineComponent } from 'vue'
import Normal from './color-picker/Normal'
import Alpha from './color-picker/Alpha'
import Hsla from './color-picker/Hsla'
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
