import { defineComponent, reactive } from 'vue'
import { NovaColorPicker } from '@/index.ts'
import { type ColorFormat } from '@/components/color-picker/color.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    const state = reactive({
      hexColor: '#1890ff',
      rgbColor: 'rgb(82, 196, 26)',
      hslColor: 'hsl(340, 82%, 52%)',
    })

    return () => (
      <div class="demo-color-picker-format">
        <h3>颜色格式</h3>

        <h4>HEX 格式</h4>
        <div class="demo-color-picker-group">
          <NovaColorPicker
            value={state.hexColor}
            format={'hex' as ColorFormat}
            onUpdate={(c) => (state.hexColor = c)}
          />
          <span class="demo-color-picker-value">{state.hexColor}</span>
        </div>

        <h4>RGB 格式</h4>
        <div class="demo-color-picker-group">
          <NovaColorPicker
            value={state.rgbColor}
            format={'rgb' as ColorFormat}
            onUpdate={(c) => (state.rgbColor = c)}
          />
          <span class="demo-color-picker-value">{state.rgbColor}</span>
        </div>

        <h4>HSL 格式</h4>
        <div class="demo-color-picker-group">
          <NovaColorPicker
            value={state.hslColor}
            format={'hsl' as ColorFormat}
            onUpdate={(c) => (state.hslColor = c)}
          />
          <span class="demo-color-picker-value">{state.hslColor}</span>
        </div>

        <div class="demo-color-picker-description">
          <p>
            支持三种颜色格式：HEX、RGB 和 HSL。使用 <code>format</code> 属性指定输出格式。
          </p>
        </div>
      </div>
    )
  },
})
