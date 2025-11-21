import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import './styles/common.css';

export default defineComponent({
  setup() {
    function handleClick() {
      console.log('Button clicked!');
    }

    return (): JSX.Element => (
      <div class="demo-button-basic">
        <h3>Basic Buttons</h3>
        <div class="demo-button-group">
          <NovaButton onClick={handleClick}>
            {(): string => 'Default Button'}
          </NovaButton>
          <NovaButton type="submit">{(): string => 'Submit Button'}</NovaButton>
          <NovaButton type="reset">{(): string => 'Reset Button'}</NovaButton>
        </div>
      </div>
    );
  },
});
