import { defineComponent, ref } from 'vue'
import { NovaButton } from '../../../index'
import { MDIRefresh } from '@jiangshengdev/material-design-icons-vue-next'
import './styles/common.css'

export default defineComponent({
  setup() {
    const clickCount = ref(0)
    const isActive = ref(false)

    function handleCounterClick() {
      clickCount.value++
    }

    function handleToggleClick() {
      isActive.value = !isActive.value
    }

    return (): JSX.Element => (
      <div class="demo-button-interactive">
        <h3>Interactive Examples</h3>

        <h4>Click Counter</h4>
        <div class="demo-button-group">
          <NovaButton onClick={handleCounterClick}>
            {clickCount.value === 0 ? 'Click me!' : `Clicked ${clickCount.value} times`}
          </NovaButton>
        </div>

        <h4>Toggle State</h4>
        <div class="demo-button-group">
          <NovaButton primary={isActive.value} onClick={handleToggleClick}>
            {isActive.value ? 'Active' : 'Inactive'}
          </NovaButton>
        </div>

        <h4>Form Actions</h4>
        <div class="demo-button-group">
          <NovaButton
            primary
            onClick={() => {
              alert('Form submitted!')
            }}
          >
            Submit Form
          </NovaButton>
          <NovaButton
            onClick={() => {
              console.log('Form reset')
            }}
          >
            Reset Form
          </NovaButton>
          <NovaButton
            onClick={() => {
              console.log('Action cancelled')
            }}
          >
            Cancel
          </NovaButton>
        </div>

        <h4>Action with Icon</h4>
        <div class="demo-button-group">
          <NovaButton
            icon={<MDIRefresh />}
            onClick={() => {
              console.log('Refreshing...')
            }}
          >
            Refresh
          </NovaButton>
        </div>
      </div>
    )
  },
})
