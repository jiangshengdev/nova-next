<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/input.css'
import { NovaInput } from '@jiangshengdev/nova-next'
</script>

<template>
  <div class="demo-column">
    <div>
      <p class="demo-title">正常状态</p>
      <div class="demo-row">
        <NovaInput placeholder="普通输入框" />
        <NovaInput value="可编辑内容" />
      </div>
    </div>

    <div>
      <p class="demo-title">禁用状态</p>
      <div class="demo-row">
        <NovaInput disabled placeholder="禁用输入框" />
        <NovaInput disabled value="禁用内容" />
      </div>
    </div>

    <div>
      <p class="demo-title">只读状态</p>
      <div class="demo-row">
        <NovaInput readonly placeholder="只读输入框" />
        <NovaInput readonly value="只读内容" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-title {
  margin: 0 0 8px;
  font-size: 14px;
  color: #333;
}
</style>
