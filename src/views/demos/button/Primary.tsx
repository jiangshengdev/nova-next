import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import './styles/common.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-primary">
        <h3>Primary Buttons</h3>
        <div class="demo-button-group">
          <NovaButton primary>Primary</NovaButton>
          <NovaButton>Secondary</NovaButton>
          <NovaButton primary name="action">
            Primary Action
          </NovaButton>
          <NovaButton primary type="submit">
            Submit
          </NovaButton>
        </div>
        <div class="demo-button-description">
          <p>
            Use <code>primary</code> prop to create a primary button with
            highlighted styling.
          </p>
        </div>
      </div>
    );
  },
});
