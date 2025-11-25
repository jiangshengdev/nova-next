import { defineComponent } from 'vue'
import Basic from './environment/EnvironmentBasicDemo.tsx'
import Nested from './environment/EnvironmentNestedDemo.tsx'
import Language from './environment/EnvironmentLanguageDemo.tsx'
import Combined from './environment/EnvironmentCombinedDemo.tsx'

export default defineComponent({
  setup() {
    return () => (
      <section>
        <Basic />
        <Nested />
        <Language />
        <Combined />
      </section>
    )
  },
})
