import { defineComponent } from 'vue'
import { NovaButton, NovaEnvironment } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-environment-nested">
        <h3>嵌套环境</h3>
        <div class="demo-environment-description">
          <p>
            <code>NovaEnvironment</code> 可以嵌套使用，内层环境会覆盖外层的主题设置。
          </p>
        </div>

        <h4>外层浅色，内层深色</h4>
        <NovaEnvironment theme="light">
          {() => (
            <div class="demo-environment-box" data-nova-theme="light">
              <NovaButton>外层浅色按钮</NovaButton>
              <NovaEnvironment theme="dark">
                {() => (
                  <div class="demo-environment-nested-box" data-nova-theme="dark">
                    <NovaButton>内层深色按钮</NovaButton>
                    <NovaButton primary>内层主要按钮</NovaButton>
                  </div>
                )}
              </NovaEnvironment>
            </div>
          )}
        </NovaEnvironment>

        <h4>外层深色，内层浅色</h4>
        <NovaEnvironment theme="dark">
          {() => (
            <div class="demo-environment-box" data-nova-theme="dark">
              <NovaButton>外层深色按钮</NovaButton>
              <NovaEnvironment theme="light">
                {() => (
                  <div class="demo-environment-nested-box" data-nova-theme="light">
                    <NovaButton>内层浅色按钮</NovaButton>
                    <NovaButton primary>内层主要按钮</NovaButton>
                  </div>
                )}
              </NovaEnvironment>
            </div>
          )}
        </NovaEnvironment>
      </div>
    )
  },
})
