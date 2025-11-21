import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  setup() {
    return (): JSX.Element => [
      <h1>Nova next</h1>,
      <p>Experimental Vue components</p>,
      <RouterLink to="/color-picker">{(): string => 'ColorPicker'}</RouterLink>,
    ];
  },
});
