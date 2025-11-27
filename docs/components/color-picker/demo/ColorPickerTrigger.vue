<script setup lang="ts">
import { ref } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker } from '@jiangshengdev/nova-next'

const highlight = ref('#722ed1')
</script>

<template>
  <div class="demo-trigger">
    <NovaColorPicker v-model="highlight">
      <template #trigger>
        <button type="button" class="demo-trigger-button">
          <span class="demo-trigger-label">选中颜色</span>
          <span class="demo-trigger-value">{{ highlight }}</span>
        </button>
      </template>
    </NovaColorPicker>
  </div>
</template>

<style scoped>
.demo-trigger {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.demo-trigger-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
}

.demo-trigger-value {
  font-family: ui-monospace, monospace;
}
</style>
