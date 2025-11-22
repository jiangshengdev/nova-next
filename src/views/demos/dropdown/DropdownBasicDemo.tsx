import { defineComponent } from 'vue'
import { NovaDropdown } from '../../../components/dropdown'
import { NovaButton } from '../../../components/button'
import './styles/common.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="demo-dropdown-basic">
        <h3>基础下拉菜单</h3>
        <div class="demo-dropdown-group">
          <NovaDropdown>
            {{
              trigger: () => <NovaButton>{() => '点击打开'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>选项 1</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown>
            {{
              trigger: () => <NovaButton primary>{() => '主要按钮'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>新建文件</li>
                  <li>打开文件</li>
                  <li>保存</li>
                  <li>另存为</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown>
            {{
              trigger: () => <NovaButton>{() => '操作菜单'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>编辑</li>
                  <li>删除</li>
                  <li>分享</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>
        <div class="demo-dropdown-description">
          <p>
            基础的下拉菜单组件，通过 <code>trigger</code> 插槽定义触发器，通过默认插槽定义菜单内容。
          </p>
        </div>
      </div>
    )
  },
})
