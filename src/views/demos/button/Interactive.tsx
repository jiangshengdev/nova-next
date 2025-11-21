import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import { MDIRefresh } from '@jiangshengdev/material-design-icons-vue-next';
import './styles/interactive.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-interactive">
        <h3>Interactive Examples</h3>
        
        <h4>Click Counter</h4>
        <div class="demo-button-group">
          <NovaButton
            onClick={(e: MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              const count = parseInt(target.dataset.count || '0') + 1;
              target.dataset.count = count.toString();
              target.textContent = `Clicked ${count} times`;
            }}
          >
            {(): string => 'Click me!'}
          </NovaButton>
        </div>

        <h4>Toggle State</h4>
        <div class="demo-button-group">
          <NovaButton
            onClick={(e: MouseEvent) => {
              const target = e.currentTarget as HTMLButtonElement;
              const isActive = target.dataset.active === 'true';
              target.dataset.active = (!isActive).toString();
              target.textContent = isActive ? 'Inactive' : 'Active';
              target.style.backgroundColor = isActive
                ? ''
                : 'var(--nova-color-primary)';
              target.style.color = isActive ? '' : 'var(--nova-color-white)';
            }}
          >
            {(): string => 'Inactive'}
          </NovaButton>
        </div>

        <h4>Form Actions</h4>
        <div class="demo-button-group">
          <NovaButton
            primary
            onClick={() => {
              alert('Form submitted!');
            }}
          >
            {(): string => 'Submit Form'}
          </NovaButton>
          <NovaButton
            onClick={() => {
              console.log('Form reset');
            }}
          >
            {(): string => 'Reset Form'}
          </NovaButton>
          <NovaButton
            onClick={() => {
              console.log('Action cancelled');
            }}
          >
            {(): string => 'Cancel'}
          </NovaButton>
        </div>

        <h4>Action with Icon</h4>
        <div class="demo-button-group">
          <NovaButton
            onClick={() => {
              console.log('Refreshing...');
            }}
          >
            {{ icon: () => <MDIRefresh />, default: () => 'Refresh' }}
          </NovaButton>
        </div>
      </div>
    );
  },
});
