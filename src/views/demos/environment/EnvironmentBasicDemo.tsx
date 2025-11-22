import { defineComponent } from 'vue'
import { NovaEnvironment, NovaButton } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-environment-basic">
        <h3>基础主题</h3>
        <div class="demo-environment-description">
          <p>
            使用 <code>NovaEnvironment</code> 组件为子组件提供主题上下文。
          </p>
        </div>

        <h4>浅色主题</h4>
        <div class="demo-environment-group">
          <NovaEnvironment theme="light">
            {() => (
              <div class="demo-environment-box" data-nova-theme="light">
                <NovaButton>浅色按钮</NovaButton>
                <NovaButton primary>主要按钮</NovaButton>
              </div>
            )}
          </NovaEnvironment>
        </div>

        <h4>深色主题</h4>
        <div class="demo-environment-group">
          <NovaEnvironment theme="dark">
            {() => (
              <div class="demo-environment-box" data-nova-theme="dark">
                <NovaButton>深色按钮</NovaButton>
                <NovaButton primary>主要按钮</NovaButton>
              </div>
            )}
          </NovaEnvironment>
        </div>
      </div>
    )
  },
})
