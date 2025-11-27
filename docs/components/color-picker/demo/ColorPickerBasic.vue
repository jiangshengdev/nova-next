<script setup lang="ts">
import { ref } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker } from '@jiangshengdev/nova-next'

const brandColor = ref('#1890ff')
const successColor = ref('#52c41a')
const dangerColor = ref('#ff4d4f')
</script>

<template>
  <div class="demo-column">
    <div class="demo-group">
      <NovaColorPicker v-model="brandColor" />
      <p class="demo-tip">{{ brandColor }}</p>
    </div>

    <div class="demo-group">
      <NovaColorPicker v-model="successColor" />
      <p class="demo-tip">{{ successColor }}</p>
    </div>

    <div class="demo-group">
      <NovaColorPicker v-model="dangerColor" />
      <p class="demo-tip">{{ dangerColor }}</p>
    </div>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 48px;
}

.demo-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.demo-tip {
  margin: 0;
  font-size: 13px;
  font-family: ui-monospace, monospace;
}
</style>
