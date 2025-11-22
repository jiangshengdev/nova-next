import { defineComponent } from 'vue';
import { NovaButton } from '../../../index';
import './styles/common.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-disabled">
        <h3>Disabled Buttons</h3>
        <div class="demo-button-group">
          <NovaButton disabled>Disabled Default</NovaButton>
          <NovaButton primary disabled>
            Disabled Primary
          </NovaButton>
          <NovaButton disabled type="submit">
            Disabled Submit
          </NovaButton>
        </div>
        <div class="demo-button-description">
          <p>
            Disabled buttons cannot be clicked and have reduced opacity to
            indicate their inactive state.
          </p>
        </div>
      </div>
    );
  },
});
