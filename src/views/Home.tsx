import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <section>
        <h1>Nova next</h1>
        <p>Experimental Vue components</p>
        <RouterLink to="/color-picker">ColorPicker</RouterLink>
      </section>
    )
  },
})
