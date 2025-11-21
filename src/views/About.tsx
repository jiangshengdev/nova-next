import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return (): JSX.Element => <h1>About page!</h1>;
  },
});
