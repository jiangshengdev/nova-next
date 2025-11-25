import { defineComponent } from 'vue'
import { NovaInput } from '@/index.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-input-styling">
        <h3>自定义样式</h3>

        <h4>使用 wrapperClass 和 wrapperStyle</h4>
        <div class="demo-input-group">
          <NovaInput wrapperStyle={{ margin: '10px' }} placeholder="自定义 wrapperStyle" />
          <NovaInput wrapperClass="custom-wrap-class" placeholder="自定义 wrapperClass" />
        </div>

        <h4>使用 class 和 style</h4>
        <div class="demo-input-group">
          <NovaInput class="custom-input-class" placeholder="自定义 class" />
          <NovaInput style={{ fontSize: '14px', padding: '8px' }} placeholder="自定义 style" />
        </div>

        <h4>组合使用</h4>
        <div class="demo-input-group">
          <NovaInput
            wrapperStyle={{ margin: '5px', border: '2px solid #4CAF50' }}
            style={{ fontSize: '16px' }}
            placeholder="组合样式"
          />
        </div>

        <div class="demo-input-description">
          <p>
            使用 <code>wrapperClass</code> 和 <code>wrapperStyle</code> 自定义外层容器样式， 使用{' '}
            <code>class</code> 和 <code>style</code> 自定义输入框本身的样式。
          </p>
        </div>
      </div>
    )
  },
})
