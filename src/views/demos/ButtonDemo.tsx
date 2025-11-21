import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../vue-jsx-compat';
import Basic from './button/Basic';
import Primary from './button/Primary';
import Disabled from './button/Disabled';
import WithIcons from './button/WithIcons';
import Interactive from './button/Interactive';
import Multilingual from './button/Multilingual';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <section>
        <Basic />
        <Primary />
        <Disabled />
        <WithIcons />
        <Interactive />
        <Multilingual />
      </section>
    );
  },
});
