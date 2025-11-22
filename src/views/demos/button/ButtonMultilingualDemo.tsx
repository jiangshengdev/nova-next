import { defineComponent } from 'vue'
import { NovaButton } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-button-multilingual">
        <h3>Multilingual Support</h3>

        <h4>Chinese (Simplified)</h4>
        <div class="demo-button-group">
          <NovaButton>确认</NovaButton>
          <NovaButton primary>提交</NovaButton>
          <NovaButton>取消</NovaButton>
          <NovaButton>删除</NovaButton>
        </div>

        <h4>English</h4>
        <div class="demo-button-group">
          <NovaButton>Confirm</NovaButton>
          <NovaButton primary>Submit</NovaButton>
          <NovaButton>Cancel</NovaButton>
          <NovaButton>Delete</NovaButton>
        </div>

        <h4>Japanese</h4>
        <div class="demo-button-group">
          <NovaButton>確認</NovaButton>
          <NovaButton primary>送信</NovaButton>
          <NovaButton>キャンセル</NovaButton>
          <NovaButton>削除</NovaButton>
        </div>

        <h4>Mixed Content</h4>
        <div class="demo-button-group">
          <NovaButton>Save 保存</NovaButton>
          <NovaButton primary>Download 下载</NovaButton>
          <NovaButton>Upload アップロード</NovaButton>
        </div>
      </div>
    )
  },
})
