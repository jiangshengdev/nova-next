import { defineComponent } from 'vue'
import { NovaEnvironment } from '@/index.ts'
import { enUS, zhCN } from '@/environments/languages'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-environment-language">
        <h3>语言配置</h3>
        <div class="demo-environment-description">
          <p>
            使用 <code>language</code> 属性为子组件提供语言上下文。
          </p>
        </div>

        <h4>简体中文</h4>
        <div class="demo-environment-group">
          <NovaEnvironment language={zhCN}>
            {() => (
              <div class="demo-environment-box">
                <p>语言名称: {zhCN.name}</p>
                <p>颜色选择器触发器: {zhCN.colorPicker.aria.trigger}</p>
              </div>
            )}
          </NovaEnvironment>
        </div>

        <h4>美式英语</h4>
        <div class="demo-environment-group">
          <NovaEnvironment language={enUS}>
            {() => (
              <div class="demo-environment-box">
                <p>Language Name: {enUS.name}</p>
                <p>Color Picker Trigger: {enUS.colorPicker.aria.trigger}</p>
              </div>
            )}
          </NovaEnvironment>
        </div>
      </div>
    )
  },
})
