import { defineComponent } from 'vue'
import Basic from './input/InputBasicDemo.tsx'
import States from './input/InputStatesDemo.tsx'
import Attributes from './input/InputAttributesDemo.tsx'
import Styling from './input/InputStylingDemo.tsx'
import Interactive from './input/InputInteractiveDemo.tsx'

export default defineComponent({
  setup() {
    return () => (
      <section>
        <Basic />
        <States />
        <Attributes />
        <Styling />
        <Interactive />
      </section>
    )
  },
})
