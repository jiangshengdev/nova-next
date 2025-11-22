import { defineComponent } from 'vue'
import Basic from './button/ButtonBasicDemo.tsx'
import Primary from './button/ButtonPrimaryDemo.tsx'
import Disabled from './button/ButtonDisabledDemo.tsx'
import WithIcons from './button/WithIcons'
import Interactive from './button/ButtonInteractiveDemo.tsx'
import Multilingual from './button/ButtonMultilingualDemo.tsx'

export default defineComponent({
  setup() {
    return () => (
      <section>
        <Basic />
        <Primary />
        <Disabled />
        <WithIcons />
        <Interactive />
        <Multilingual />
      </section>
    )
  },
})
