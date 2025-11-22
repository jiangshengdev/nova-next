import { defineComponent } from 'vue'
import { NovaDropdown } from '../../../components/dropdown'
import { NovaButton } from '../../../components/button'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-dropdown-disabled">
        <h3>禁用状态</h3>
        <div class="demo-dropdown-group">
          <NovaDropdown disabled>
            {{
              trigger: () => <NovaButton>{() => '禁用的下拉菜单'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>此菜单已禁用</li>
                  <li>无法打开</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown disabled>
            {{
              trigger: () => <NovaButton primary>{() => '禁用主要按钮'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>此菜单已禁用</li>
                  <li>无法打开</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown>
            {{
              trigger: () => <NovaButton>{() => '正常下拉菜单'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>正常可用</li>
                  <li>可以打开</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>
        <div class="demo-dropdown-description">
          <p>
            使用 <code>disabled</code> 属性禁用下拉菜单。禁用后无法通过点击触发器打开菜单。
          </p>
        </div>
      </div>
    )
  },
})
