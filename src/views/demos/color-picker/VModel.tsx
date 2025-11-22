import { defineComponent, reactive } from 'vue';
import { NovaColorPicker } from '../../../index';

export default defineComponent({
  name: 'ColorPickerVModelDemo',
  setup() {
    const state = reactive({
      color: '#808080',
    });

    return (): JSX.Element => (
      <div>
        <div id="print">{state.color}</div>
        <NovaColorPicker v-model:value={state.color} theme="dark" />
        <NovaColorPicker v-model:value={state.color} theme="light" />
      </div>
    );
  },
});
