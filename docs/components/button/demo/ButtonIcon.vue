<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton } from '@jiangshengdev/nova-next'

const starIcon = '⭐'
</script>

<template>
  <div class="demo-row">
    <NovaButton :icon="starIcon">图标属性</NovaButton>
    <NovaButton>
      <template #icon>🚀</template>
      插槽图标
    </NovaButton>
    <NovaButton :icon="starIcon" aria-label="仅图标按钮" />
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
