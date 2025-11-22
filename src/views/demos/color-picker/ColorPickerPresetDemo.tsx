import { defineComponent, reactive } from 'vue'
import { NovaColorPicker } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    const state = reactive({
      color: '#1890ff',
    })

    const presetColors = [
      '#ff4d4f',
      '#ff7a45',
      '#ffa940',
      '#ffc53d',
      '#ffec3d',
      '#bae637',
      '#73d13d',
      '#36cfc9',
      '#40a9ff',
      '#597ef7',
      '#9254de',
      '#f759ab',
    ]

    const themeColors = [
      '#1890ff', // 品牌色
      '#52c41a', // 成功色
      '#faad14', // 警告色
      '#f5222d', // 错误色
      '#722ed1', // 紫色
      '#13c2c2', // 青色
    ]

    return () => (
      <div class="demo-color-picker-preset">
        <h3>预设颜色</h3>

        <h4>常用颜色</h4>
        <div class="demo-color-picker-group">
          <NovaColorPicker
            value={state.color}
            preset={presetColors}
            onUpdate={(c) => (state.color = c)}
          />
          <span class="demo-color-picker-value">{state.color}</span>
        </div>

        <h4>主题色</h4>
        <div class="demo-color-picker-group">
          <NovaColorPicker
            value={state.color}
            preset={themeColors}
            onUpdate={(c) => (state.color = c)}
          />
          <span class="demo-color-picker-value">{state.color}</span>
        </div>

        <div class="demo-color-picker-description">
          <p>
            使用 <code>preset</code> 属性提供预设颜色，方便用户快速选择常用颜色。
          </p>
        </div>
      </div>
    )
  },
})
