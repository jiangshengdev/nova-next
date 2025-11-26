<script setup lang="ts">
import { ref } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker } from '@jiangshengdev/nova-next'

const color = ref('#40a9ff')
const accent = ref('#faad14')
const presetColors = ['#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d', '#bae637', '#73d13d', '#40a9ff']
const themeColors = ['#1677ff', '#36cfc9', '#faad14', '#f5222d']
</script>

<template>
  <div class="demo-preset">
    <div class="demo-group">
      <span class="demo-label">常用颜色</span>
      <NovaColorPicker v-model="color" :preset="presetColors" />
      <span class="demo-value">{{ color }}</span>
    </div>

    <div class="demo-group">
      <span class="demo-label">主题色组合</span>
      <NovaColorPicker v-model="accent" :preset="themeColors" />
      <span class="demo-value">{{ accent }}</span>
    </div>
  </div>
</template>

<style scoped>
.demo-preset {
  display: flex;
  flex-direction: row;
  gap: 48px;
}

.demo-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.demo-label {
  font-size: 13px;
}

.demo-value {
  font-family: ui-monospace, monospace;
  font-size: 13px;
}
</style>
