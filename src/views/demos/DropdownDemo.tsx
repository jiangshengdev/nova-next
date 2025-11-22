import { defineComponent } from 'vue'
import Matrix from './dropdown/DropdownMatrixDemo.tsx'
import Normal from './dropdown/DropdownNormalDemo.tsx'

export default defineComponent({
  setup() {
    return () => (
      <section>
        <Normal />
        <Matrix />
      </section>
    )
  },
})
