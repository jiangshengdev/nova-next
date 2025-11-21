import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import './styles/disabled.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-disabled">
        <h3>Disabled Buttons</h3>
        <div class="demo-button-group">
          <NovaButton disabled>{(): string => 'Disabled Default'}</NovaButton>
          <NovaButton primary disabled>
            {(): string => 'Disabled Primary'}
          </NovaButton>
          <NovaButton disabled type="submit">
            {(): string => 'Disabled Submit'}
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
