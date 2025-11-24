import { defineComponent, ref } from 'vue'
import { NovaButton, NovaInput } from '../../../index'
import './styles/common.css'

export default defineComponent({
  setup() {
    const inputValue = ref('')
    const characterCount = ref(0)
    const isRequired = ref(false)

    function handleInput(e: Event) {
      const value = (e.target as HTMLInputElement).value
      inputValue.value = value
      characterCount.value = value.length
      console.log('当前输入:', value)
    }

    function toggleRequired() {
      isRequired.value = !isRequired.value
    }

    function clearInput() {
      inputValue.value = ''
      characterCount.value = 0
    }

    return () => (
      <div class="demo-input-interactive">
        <h3>交互式示例</h3>

        <h4>字符计数</h4>
        <div class="demo-input-group">
          <NovaInput
            value={inputValue.value}
            placeholder="输入内容查看计数"
            onInput={handleInput}
          />
          <span>字符数: {characterCount.value}</span>
        </div>

        <h4>动态切换必填状态</h4>
        <div class="demo-input-group">
          <NovaInput
            required={isRequired.value}
            placeholder={isRequired.value ? '必填字段' : '非必填字段'}
          />
          <NovaButton onClick={toggleRequired}>
            {isRequired.value ? '取消必填' : '设为必填'}
          </NovaButton>
        </div>

        <h4>表单操作</h4>
        <div class="demo-input-group">
          <NovaInput value={inputValue.value} placeholder="输入一些内容" onInput={handleInput} />
          <NovaButton onClick={clearInput}>清空</NovaButton>
          <NovaButton
            primary
            onClick={() => {
              alert(`提交的内容: ${inputValue.value}`)
            }}
          >
            提交
          </NovaButton>
        </div>

        <div class="demo-input-description">
          <p>演示输入框的交互功能，包括实时字符计数、动态切换状态和表单操作等。</p>
        </div>
      </div>
    )
  },
})
