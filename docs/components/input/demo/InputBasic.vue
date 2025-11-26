<script setup lang="ts">
import { ref } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/input.css'
import { NovaInput } from '@jiangshengdev/nova-next'

const controlledValue = ref('受控输入')
</script>

<template>
  <div class="demo-column">
    <div class="demo-row">
      <NovaInput placeholder="请输入内容" />
      <NovaInput value="默认值" />
      <NovaInput v-model="controlledValue" placeholder="受控输入" />
    </div>
    <p class="demo-tip">当前输入：{{ controlledValue }}</p>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-tip {
  margin: 0;
  font-size: 13px;
  color: #666;
}
</style>
