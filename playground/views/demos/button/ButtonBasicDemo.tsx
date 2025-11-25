import { defineComponent } from 'vue'
import { NovaButton } from '@/index.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    function handleClick() {
      console.log('Button clicked!')
    }

    return () => (
      <div class="demo-button-basic">
        <h3>Basic Buttons</h3>
        <div class="demo-button-group">
          <NovaButton onClick={handleClick}>Default Button</NovaButton>
          <NovaButton type="submit">Submit Button</NovaButton>
          <NovaButton type="reset">Reset Button</NovaButton>
        </div>
      </div>
    )
  },
})
