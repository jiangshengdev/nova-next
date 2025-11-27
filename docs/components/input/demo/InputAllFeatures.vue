<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/input.css'
import { NovaInput, zhCN, enUS } from '@jiangshengdev/nova-next'
import { ref } from 'vue'

const inputValue = ref('')

const handleUpdate = (value: string) => {
  console.log('Input value:', value)
}
</script>

<template>
  <div class="demo-container">
    <!-- Props: modelValue (v-model) -->
    <section>
      <h4>v-model 双向绑定</h4>
      <NovaInput v-model="inputValue" placeholder="输入内容" />
      <span class="value-display">值: {{ inputValue }}</span>
    </section>

    <!-- Props: disabled -->
    <section>
      <h4>disabled 属性</h4>
      <NovaInput placeholder="正常状态" />
      <NovaInput disabled placeholder="禁用状态" />
    </section>

    <!-- Props: readonly -->
    <section>
      <h4>readonly 属性</h4>
      <NovaInput readonly model-value="只读内容" />
    </section>

    <!-- Props: type -->
    <section>
      <h4>type 属性</h4>
      <NovaInput type="text" placeholder="text" />
      <NovaInput type="password" placeholder="password" />
      <NovaInput type="number" placeholder="number" />
    </section>

    <!-- Props: placeholder -->
    <section>
      <h4>placeholder 属性</h4>
      <NovaInput placeholder="请输入内容..." />
    </section>

    <!-- Props: maxlength / minlength -->
    <section>
      <h4>maxlength / minlength 属性</h4>
      <NovaInput :maxlength="10" placeholder="最多10字符" />
      <NovaInput :minlength="5" placeholder="最少5字符" />
    </section>

    <!-- Props: wrapperClass / wrapperStyle -->
    <section>
      <h4>wrapperClass / wrapperStyle 属性</h4>
      <NovaInput wrapper-class="custom-wrapper" placeholder="自定义容器类" />
      <NovaInput :wrapper-style="{ border: '2px solid #1890ff' }" placeholder="自定义容器样式" />
    </section>

    <!-- Props: theme -->
    <section>
      <h4>theme 属性</h4>
      <NovaInput theme="light" placeholder="Light 主题" />
      <NovaInput theme="dark" placeholder="Dark 主题" />
    </section>

    <!-- Props: language -->
    <section>
      <h4>language 属性</h4>
      <NovaInput :language="zhCN" placeholder="中文" />
      <NovaInput :language="enUS" placeholder="English" />
    </section>

    <!-- Events: update:modelValue -->
    <section>
      <h4>update:modelValue 事件</h4>
      <NovaInput placeholder="输入触发事件" @update:model-value="handleUpdate" />
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

h4 {
  width: 100%;
  margin: 0;
  font-size: 14px;
  color: #666;
}

.value-display {
  font-size: 14px;
  color: #999;
}

.custom-wrapper {
  border-radius: 8px;
}
</style>
""
