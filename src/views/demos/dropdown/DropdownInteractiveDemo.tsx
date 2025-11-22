import { defineComponent, ref, type Ref } from 'vue'
import { NovaDropdown, type DropdownPanelScoped } from '../../../components/dropdown'
import { NovaButton } from '../../../components/button'
import { MDICheck } from '@jiangshengdev/material-design-icons-vue-next'
import './styles/common.css'

export default defineComponent({
  setup() {
    const selectedOption = ref('选项 1')
    const checkedOptions = ref<string[]>(['苹果'])
    const dropdownOpen = ref(false)

    function handleSelect(option: string) {
      selectedOption.value = option
    }

    function toggleOption(option: string) {
      const index = checkedOptions.value.indexOf(option)
      if (index > -1) {
        checkedOptions.value = checkedOptions.value.filter((o) => o !== option)
      } else {
        checkedOptions.value = [...checkedOptions.value, option]
      }
    }

    function isChecked(option: string) {
      return checkedOptions.value.includes(option)
    }

    return () => (
      <div class="demo-dropdown-interactive">
        <h3>交互式演示</h3>

        <h4>单选菜单</h4>
        <div class="demo-dropdown-description">
          <p>当前选择：{selectedOption.value}</p>
        </div>
        <div class="demo-dropdown-group">
          <NovaDropdown>
            {{
              trigger: () => (
                <NovaButton>{() => `选择：${selectedOption.value}`}</NovaButton>
              ),
              default: ({ panelAutoFocusRef }: DropdownPanelScoped) => (
                <ul
                  class="demo-dropdown-menu demo-dropdown-menu-interactive"
                  ref={panelAutoFocusRef}
                >
                  {['选项 1', '选项 2', '选项 3', '选项 4'].map((option) => (
                    <li
                      key={option}
                      class={selectedOption.value === option ? 'selected' : ''}
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                      {selectedOption.value === option && (
                        <span style={{ marginLeft: '8px', width: '18px', height: '18px', display: 'inline-flex' }}>
                          <MDICheck />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>多选菜单</h4>
        <div class="demo-dropdown-description">
          <p>
            已选择：{checkedOptions.value.length > 0 ? checkedOptions.value.join('、') : '无'}
          </p>
        </div>
        <div class="demo-dropdown-group">
          <NovaDropdown>
            {{
              trigger: () => (
                <NovaButton>
                  {() => `水果 (${checkedOptions.value.length})`}
                </NovaButton>
              ),
              default: ({ panelAutoFocusRef }: DropdownPanelScoped) => (
                <ul
                  class="demo-dropdown-menu demo-dropdown-menu-interactive"
                  ref={panelAutoFocusRef}
                >
                  {['苹果', '香蕉', '橙子', '葡萄', '西瓜'].map((fruit) => (
                    <li
                      key={fruit}
                      class={isChecked(fruit) ? 'selected' : ''}
                      onClick={() => toggleOption(fruit)}
                    >
                      {fruit}
                      {isChecked(fruit) && (
                        <span style={{ marginLeft: '8px', width: '18px', height: '18px', display: 'inline-flex' }}>
                          <MDICheck />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>打开状态监听</h4>
        <div class="demo-dropdown-description">
          <p>下拉菜单状态：{dropdownOpen.value ? '已打开' : '已关闭'}</p>
        </div>
        <div class="demo-dropdown-group">
          <NovaDropdown onOpenChange={(open) => (dropdownOpen.value = open)}>
            {{
              trigger: () => <NovaButton>{() => '打开菜单'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>打开此菜单会触发状态更新</li>
                  <li>关闭菜单也会触发状态更新</li>
                  <li>点击外部区域关闭</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>手动控制关闭</h4>
        <div class="demo-dropdown-group">
          <NovaDropdown>
            {{
              trigger: () => (
                <NovaButton primary>{() => '操作菜单'}</NovaButton>
              ),
              default: ({ panelAutoFocusRef }: DropdownPanelScoped) => {
                return (
                  <ul class="demo-dropdown-menu" ref={panelAutoFocusRef}>
                    <li
                      onClick={() => {
                        alert('保存成功！')
                        // 菜单会自动关闭
                      }}
                    >
                      保存
                    </li>
                    <li
                      onClick={() => {
                        alert('已删除')
                        // 菜单会自动关闭
                      }}
                    >
                      删除
                    </li>
                    <li onClick={() => alert('操作已取消')}>取消</li>
                  </ul>
                )
              },
            }}
          </NovaDropdown>
        </div>

        <div class="demo-dropdown-description" style="margin-top: 16px">
          <p>
            通过 <code>onOpenChange</code> 监听下拉菜单的打开/关闭状态。菜单在点击外部区域或按
            ESC 键时会自动关闭。
          </p>
        </div>
      </div>
    )
  },
})
