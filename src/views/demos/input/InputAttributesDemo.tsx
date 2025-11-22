import { defineComponent } from 'vue'
import { NovaInput } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-input-attributes">
        <h3>HTML 属性</h3>

        <h4>必填与长度限制</h4>
        <div class="demo-input-group">
          <NovaInput required placeholder="必填字段 (required)" />
          <NovaInput minlength={3} placeholder="最小长度 3 (minlength)" />
          <NovaInput maxlength={10} placeholder="最大长度 10 (maxlength)" />
        </div>

        <h4>输入模式</h4>
        <div class="demo-input-group">
          <NovaInput type="email" placeholder="邮箱 (type=email)" />
          <NovaInput type="password" placeholder="密码 (type=password)" />
          <NovaInput type="number" placeholder="数字 (type=number)" />
        </div>

        <h4>其他属性</h4>
        <div class="demo-input-group">
          <NovaInput name="username" id="username" placeholder="带 name 和 id" />
          <NovaInput size={15} placeholder="size=15" />
          <NovaInput autocomplete="off" placeholder="autocomplete=off" />
        </div>

        <div class="demo-input-description">
          <p>
            NovaInput 支持所有标准的 HTML input 属性，如 <code>required</code>、
            <code>minlength</code>、<code>maxlength</code>、<code>type</code>、<code>name</code>、
            <code>id</code> 等。
          </p>
        </div>
      </div>
    )
  },
})
