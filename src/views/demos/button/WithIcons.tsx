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
          <NovaButton>{{ icon: () => <MDICamera /> }}</NovaButton>
          <NovaButton>{{ icon: () => <MDITheaters /> }}</NovaButton>
          <NovaButton>{{ icon: () => <MDIHome /> }}</NovaButton>
          <NovaButton>{{ icon: () => <MDISettings /> }}</NovaButton>
          <NovaButton primary>{{ icon: () => <MDIDelete /> }}</NovaButton>
        </div>

        <h4>Icon with Text</h4>
        <div class="demo-button-group">
          <NovaButton>
            {{ icon: () => <MDICamera />, default: () => 'Camera' }}
          </NovaButton>
          <NovaButton>
            {{ icon: () => <MDITheaters />, default: () => 'Theaters' }}
          </NovaButton>
          <NovaButton>
            {{ icon: () => <MDIHome />, default: () => 'Home' }}
          </NovaButton>
          <NovaButton primary>
            {{ icon: () => <MDIFileDownload />, default: () => 'Download' }}
          </NovaButton>
        </div>

        <h4>Emoji Icons</h4>
        <div class="demo-button-group">
          <NovaButton>{{ icon: (): string => '🚀' }}</NovaButton>
          <NovaButton>{{ icon: (): string => '⭐' }}</NovaButton>
          <NovaButton>{{ icon: (): string => '❤️' }}</NovaButton>
          <NovaButton primary>{{ icon: (): string => '✨' }}</NovaButton>
        </div>
      </div>
    );
  },
});
