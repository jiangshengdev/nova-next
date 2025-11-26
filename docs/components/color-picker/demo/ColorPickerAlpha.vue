<script setup lang="ts">
import { ref, watch } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker, Color } from '@jiangshengdev/nova-next'

const color = ref('rgba(64, 158, 255, 0.8)')
const alphaEnabled = ref(true)
const format = ref<'hex' | 'rgb' | 'hsl'>('rgb')

// 当 alphaEnabled 或 format 改变时，重新格式化颜色值
watch([alphaEnabled, format], ([newAlphaEnabled], [oldAlphaEnabled]) => {
  const parsedColor = Color.parse(color.value)
  const { red, green, blue } = parsedColor

  if (!newAlphaEnabled) {
    // 移除透明通道
    const opaqueColor = new Color(red, green, blue)

    color.value = opaqueColor.toString(format.value)
  } else if (oldAlphaEnabled === false) {
    // 从关闭切换到开启，设置为 80% 透明
    const transparentColor = new Color(red, green, blue, 0.8)

    color.value = transparentColor.toString(format.value)
  } else {
    // 只是格式切换，保持透明通道
    color.value = parsedColor.toString(format.value)
  }
})
</script>

<template>
  <div class="demo-alpha">
    <div class="demo-controls">
      <div class="demo-control">
        <label class="demo-checkbox">
          <input v-model="alphaEnabled" type="checkbox" /> 透明通道
        </label>
      </div>
      <div class="demo-control">
        <span>输出格式</span>
        <label class="demo-radio"> <input v-model="format" type="radio" value="hex" /> HEX </label>
        <label class="demo-radio">
          <input v-model="format" type="radio" value="rgb" /> RGB(A)
        </label>
        <label class="demo-radio">
          <input v-model="format" type="radio" value="hsl" /> HSL(A)
        </label>
      </div>
    </div>
    <div class="demo-picker">
      <NovaColorPicker v-model="color" :alpha="alphaEnabled" :format="format" />
      <span class="demo-value">{{ color }}</span>
    </div>
  </div>
</template>

<style scoped>
.demo-alpha {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
}

.demo-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.demo-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.demo-checkbox input[type='checkbox'] {
  margin: 0;
}

.demo-radio {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.demo-radio input[type='radio'] {
  margin: 0;
}

.demo-picker {
  display: flex;
  align-items: center;
  gap: 8px;
}

.demo-value {
  font-family: ui-monospace, monospace;
  font-size: 13px;
}
</style>
