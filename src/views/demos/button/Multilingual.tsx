import { defineComponent } from 'vue';
import { vueJsxCompat } from '../../../vue-jsx-compat';
import { NovaButton } from '../../../index';
import './styles/multilingual.css';

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <div class="demo-button-multilingual">
        <h3>Multilingual Support</h3>
        
        <h4>Chinese (Simplified)</h4>
        <div class="demo-button-group">
          <NovaButton>{(): string => '确认'}</NovaButton>
          <NovaButton primary>{(): string => '提交'}</NovaButton>
          <NovaButton>{(): string => '取消'}</NovaButton>
          <NovaButton>{(): string => '删除'}</NovaButton>
        </div>

        <h4>English</h4>
        <div class="demo-button-group">
          <NovaButton>{(): string => 'Confirm'}</NovaButton>
          <NovaButton primary>{(): string => 'Submit'}</NovaButton>
          <NovaButton>{(): string => 'Cancel'}</NovaButton>
          <NovaButton>{(): string => 'Delete'}</NovaButton>
        </div>

        <h4>Japanese</h4>
        <div class="demo-button-group">
          <NovaButton>{(): string => '確認'}</NovaButton>
          <NovaButton primary>{(): string => '送信'}</NovaButton>
          <NovaButton>{(): string => 'キャンセル'}</NovaButton>
          <NovaButton>{(): string => '削除'}</NovaButton>
        </div>

        <h4>Mixed Content</h4>
        <div class="demo-button-group">
          <NovaButton>{(): string => 'Save 保存'}</NovaButton>
          <NovaButton primary>{(): string => 'Download 下载'}</NovaButton>
          <NovaButton>{(): string => 'Upload アップロード'}</NovaButton>
        </div>
      </div>
    );
  },
});
