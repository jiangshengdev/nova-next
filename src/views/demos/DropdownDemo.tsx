import { defineComponent } from 'vue'
import Matrix from './dropdown/Matrix'
import Normal from './dropdown/Normal'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <section>
        <Normal />
        <Matrix />
      </section>
    )
  },
})
