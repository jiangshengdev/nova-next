import { defineComponent } from 'vue'
import { NovaInput } from '@/index.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-input-states">
        <h3>输入框状态</h3>

        <h4>正常状态</h4>
        <div class="demo-input-group">
          <NovaInput placeholder="正常输入框" />
          <NovaInput value="可编辑的内容" />
        </div>

        <h4>禁用状态</h4>
        <div class="demo-input-group">
          <NovaInput disabled placeholder="禁用的输入框" />
          <NovaInput disabled value="禁用状态的内容" />
        </div>

        <h4>只读状态</h4>
        <div class="demo-input-group">
          <NovaInput readonly placeholder="只读输入框" />
          <NovaInput readonly value="只读状态的内容" />
        </div>

        <div class="demo-input-description">
          <p>
            使用 <code>disabled</code> 属性禁用输入框，使用 <code>readonly</code>{' '}
            属性设置为只读状态。只读状态下内容可选择但不可编辑。
          </p>
        </div>
      </div>
    )
  },
})
