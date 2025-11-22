import { defineComponent } from 'vue'
import Basic from './dropdown/DropdownBasicDemo.tsx'
import Placement from './dropdown/DropdownPlacementDemo.tsx'
import Disabled from './dropdown/DropdownDisabledDemo.tsx'
import Interactive from './dropdown/DropdownInteractiveDemo.tsx'
import Normal from './dropdown/DropdownNormalDemo.tsx'
import Matrix from './dropdown/DropdownMatrixDemo.tsx'

export default defineComponent({
  setup() {
    return () => (
      <section>
        <Basic />
        <Placement />
        <Disabled />
        <Interactive />
        <Normal />
        <Matrix />
      </section>
    )
  },
})
