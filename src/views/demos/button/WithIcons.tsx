import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import {
  MDICamera,
  MDITheaters,
  MDIHome,
  MDISettings,
  MDIDelete,
  MDIFileDownload,
} from '@jiangshengdev/material-design-icons-vue-next';
import './styles/common.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-with-icons">
        <h3>Buttons with Icons</h3>

        <h4>Icon Only</h4>
        <div class="demo-button-group">
          <NovaButton icon={<MDICamera />} />
          <NovaButton icon={<MDITheaters />} />
          <NovaButton icon={<MDIHome />} />
          <NovaButton icon={<MDISettings />} />
          <NovaButton primary icon={<MDIDelete />} />
        </div>

        <h4>Icon with Text</h4>
        <div class="demo-button-group">
          <NovaButton icon={<MDICamera />}>Camera</NovaButton>
          <NovaButton icon={<MDITheaters />}>Theaters</NovaButton>
          <NovaButton icon={<MDIHome />}>Home</NovaButton>
          <NovaButton primary icon={<MDIFileDownload />}>
            Download
          </NovaButton>
        </div>

        <h4>Emoji Icons</h4>
        <div class="demo-button-group">
          <NovaButton icon="🚀" />
          <NovaButton icon="⭐" />
          <NovaButton icon="❤️" />
          <NovaButton primary icon="✨" />
        </div>
      </div>
    );
  },
});
