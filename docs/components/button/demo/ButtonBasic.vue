<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton } from '@jiangshengdev/nova-next'
</script>

<template>
  <div class="demo-row">
    <NovaButton>默认按钮</NovaButton>
    <NovaButton primary>主要按钮</NovaButton>
    <NovaButton disabled>禁用按钮</NovaButton>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
