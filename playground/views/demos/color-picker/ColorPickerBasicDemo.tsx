import { defineComponent, reactive } from 'vue'
import { NovaColorPicker } from '@/index.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    const state = reactive({
      color1: '#1890ff',
      color2: '#52c41a',
      color3: '#ff4d4f',
    })

    return () => (
      <div class="demo-color-picker-basic">
        <h3>基础用法</h3>
        <div class="demo-color-picker-group">
          <NovaColorPicker value={state.color1} onUpdate={(c) => (state.color1 = c)} />
          <NovaColorPicker value={state.color2} onUpdate={(c) => (state.color2 = c)} />
          <NovaColorPicker value={state.color3} onUpdate={(c) => (state.color3 = c)} />
        </div>
        <div class="demo-color-picker-description">
          <p>最简单的用法，点击触发器打开颜色选择面板。</p>
        </div>
      </div>
    )
  },
})
