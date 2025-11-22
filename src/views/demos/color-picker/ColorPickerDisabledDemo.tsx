import { defineComponent, reactive } from 'vue'
import { NovaButton, NovaColorPicker } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    const state = reactive({
      color: '#1890ff',
      disabled: true,
    })

    function toggleDisabled() {
      state.disabled = !state.disabled
    }

    return () => (
      <div class="demo-color-picker-disabled">
        <h3>禁用状态</h3>
        <div class="demo-color-picker-group">
          <NovaColorPicker value={state.color} disabled />
          <NovaColorPicker value="#52c41a" disabled alpha />
          <NovaColorPicker
            value={state.color}
            disabled={state.disabled}
            onUpdate={(c) => (state.color = c)}
          />
          <NovaButton onClick={toggleDisabled}>{state.disabled ? '启用' : '禁用'}</NovaButton>
        </div>
        <div class="demo-color-picker-description">
          <p>禁用状态下，颜色选择器无法打开。可以动态控制禁用状态。</p>
        </div>
      </div>
    )
  },
})
