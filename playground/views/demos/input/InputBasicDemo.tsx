import { defineComponent } from 'vue'
import { NovaInput } from '@/index.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    function handleInput(e: Event) {
      console.log('Input value:', (e.target as HTMLInputElement).value)
    }

    return () => (
      <div class="demo-input-basic">
        <h3>基础输入框</h3>
        <div class="demo-input-group">
          <NovaInput placeholder="请输入内容" />
          <NovaInput value="默认值" />
          <NovaInput placeholder="带事件处理" onInput={handleInput} />
        </div>
        <div class="demo-input-description">
          <p>NovaInput 是基础的文本输入组件，支持标准 HTML input 属性。</p>
        </div>
      </div>
    )
  },
})
