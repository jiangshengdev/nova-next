import { defineComponent, ref } from 'vue'
import { NovaDropdown } from '@/components/dropdown'
import { NovaButton } from '@/components/button'
import { type Placement } from '@/types/props.ts'
import './styles/common.css'

export default defineComponent({
  setup() {
    const currentPlacement = ref<Placement>('bottomLeft')

    function updatePlacement(placement: Placement) {
      currentPlacement.value = placement
    }

    return () => (
      <div class="demo-dropdown-placement">
        <h3>不同位置的下拉菜单</h3>

        <h4>顶部位置</h4>
        <div class="demo-dropdown-group">
          <NovaDropdown placement="topLeft">
            {{
              trigger: () => <NovaButton>{() => '左上'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>左上位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="top">
            {{
              trigger: () => <NovaButton>{() => '上方'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>正上方位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="topRight">
            {{
              trigger: () => <NovaButton>{() => '右上'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>右上位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>底部位置（默认）</h4>
        <div class="demo-dropdown-group">
          <NovaDropdown placement="bottomLeft">
            {{
              trigger: () => <NovaButton>{() => '左下'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>左下位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="bottom">
            {{
              trigger: () => <NovaButton>{() => '下方'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>正下方位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="bottomRight">
            {{
              trigger: () => <NovaButton>{() => '右下'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>右下位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>左侧位置</h4>
        <div class="demo-dropdown-group">
          <NovaDropdown placement="leftTop">
            {{
              trigger: () => <NovaButton>{() => '左上'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>左上位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="left">
            {{
              trigger: () => <NovaButton>{() => '左侧'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>左侧位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="leftBottom">
            {{
              trigger: () => <NovaButton>{() => '左下'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>左下位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>右侧位置</h4>
        <div class="demo-dropdown-group">
          <NovaDropdown placement="rightTop">
            {{
              trigger: () => <NovaButton>{() => '右上'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>右上位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="right">
            {{
              trigger: () => <NovaButton>{() => '右侧'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>右侧位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>

          <NovaDropdown placement="rightBottom">
            {{
              trigger: () => <NovaButton>{() => '右下'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>右下位置</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <h4>动态位置切换</h4>
        <div class="demo-dropdown-description">
          <p>当前位置：{currentPlacement.value}</p>
        </div>
        <div class="demo-dropdown-group">
          <NovaButton onClick={() => updatePlacement('topLeft')}>{() => '切换到左上'}</NovaButton>
          <NovaButton onClick={() => updatePlacement('bottom')}>{() => '切换到下方'}</NovaButton>
          <NovaButton onClick={() => updatePlacement('rightTop')}>{() => '切换到右上'}</NovaButton>
        </div>
        <div class="demo-dropdown-group" style="margin-top: 12px">
          <NovaDropdown placement={currentPlacement.value}>
            {{
              trigger: () => <NovaButton primary>{() => '打开菜单'}</NovaButton>,
              default: () => (
                <ul class="demo-dropdown-menu">
                  <li>位置：{currentPlacement.value}</li>
                  <li>选项 2</li>
                  <li>选项 3</li>
                </ul>
              ),
            }}
          </NovaDropdown>
        </div>

        <div class="demo-dropdown-description" style="margin-top: 16px">
          <p>
            使用 <code>placement</code> 属性控制下拉菜单的弹出位置。支持 12 种位置：上下左右各 3
            个位置。
          </p>
        </div>
      </div>
    )
  },
})
