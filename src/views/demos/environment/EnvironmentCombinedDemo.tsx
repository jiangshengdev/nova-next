import { defineComponent, ref } from 'vue'
import { NovaEnvironment, NovaButton } from '../../../index'
import { enUS, zhCN } from '@/environments/languages'
import './styles/common.css'

export default defineComponent({
  setup() {
    const theme = ref('light')
    const language = ref(zhCN)

    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function toggleLanguage() {
      language.value = language.value === zhCN ? enUS : zhCN
    }

    return () => (
      <div class="demo-environment-combined">
        <h3>主题与语言组合</h3>
        <div class="demo-environment-description">
          <p>
            同时使用 <code>theme</code> 和 <code>language</code> 属性提供完整的环境配置。
          </p>
        </div>

        <h4>交互式切换</h4>
        <div class="demo-environment-group">
          <div class="demo-environment-controls">
            <NovaButton onClick={toggleTheme}>
              切换主题: {theme.value === 'light' ? '浅色' : '深色'}
            </NovaButton>
            <NovaButton onClick={toggleLanguage}>切换语言: {language.value.name}</NovaButton>
          </div>
        </div>

        <div class="demo-environment-group">
          <NovaEnvironment theme={theme.value} language={language.value}>
            {() => (
              <div class="demo-environment-box" data-nova-theme={theme.value}>
                <NovaButton>普通按钮</NovaButton>
                <NovaButton primary>主要按钮</NovaButton>
                <p>当前主题: {theme.value}</p>
                <p>当前语言: {language.value.name}</p>
              </div>
            )}
          </NovaEnvironment>
        </div>
      </div>
    )
  },
})
