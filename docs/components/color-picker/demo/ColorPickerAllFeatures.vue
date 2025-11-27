<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker, zhCN, enUS } from '@jiangshengdev/nova-next'
import { ref } from 'vue'

const colorValue = ref('#1890ff')
const jsxColorValue = ref('#52c41a')

const handleUpdate = (color: string) => {
  console.log('Color updated:', color)
}

const handleUpdateModelValue = (color: string) => {
  jsxColorValue.value = color
  console.log('update:modelValue:', color)
}

const presetColors = [
  '#ff4d4f',
  '#ff7a45',
  '#ffa940',
  '#ffc53d',
  '#ffec3d',
  '#bae637',
  '#73d13d',
  '#52c41a',
]
</script>

<template>
  <div class="demo-container">
    <!-- Props: modelValue (v-model) -->
    <section>
      <h4>v-model 双向绑定</h4>
      <NovaColorPicker v-model="colorValue" />
      <span class="value-display">值: {{ colorValue }}</span>
    </section>

    <!-- Props: value -->
    <section>
      <h4>value 属性（非受控）</h4>
      <NovaColorPicker value="#52c41a" />
    </section>

    <!-- Props: alpha -->
    <section>
      <h4>alpha 属性</h4>
      <NovaColorPicker alpha />
      <span class="value-display">支持透明度</span>
    </section>

    <!-- Props: format -->
    <section>
      <h4>format 属性</h4>
      <NovaColorPicker format="hex" value="#1890ff" />
      <NovaColorPicker format="rgb" value="#1890ff" />
      <NovaColorPicker format="hsl" value="#1890ff" />
    </section>

    <!-- Props: preset -->
    <section>
      <h4>preset 属性</h4>
      <NovaColorPicker :preset="presetColors" />
    </section>

    <!-- Props: disabled -->
    <section>
      <h4>disabled 属性</h4>
      <NovaColorPicker value="#1890ff" />
      <NovaColorPicker disabled value="#1890ff" />
    </section>

    <!-- Props: placement -->
    <section>
      <h4>placement 属性</h4>
      <NovaColorPicker placement="bottomLeft" value="#1890ff" />
      <NovaColorPicker placement="bottomRight" value="#52c41a" />
    </section>

    <!-- Props: teleportToBody -->
    <section>
      <h4>teleportToBody 属性</h4>
      <NovaColorPicker :teleport-to-body="true" value="#1890ff" />
      <NovaColorPicker :teleport-to-body="false" value="#52c41a" />
    </section>

    <!-- Props: panelClass / panelStyle / panelProps -->
    <section>
      <h4>panelClass / panelStyle / panelProps 属性</h4>
      <NovaColorPicker panel-class="custom-panel" value="#1890ff" />
      <NovaColorPicker :panel-style="{ borderRadius: '12px' }" value="#52c41a" />
      <NovaColorPicker :panel-props="{ 'data-testid': 'color-picker-panel' }" value="#ff4d4f" />
    </section>

    <!-- Props: theme -->
    <section>
      <h4>theme 属性</h4>
      <NovaColorPicker theme="light" value="#1890ff" />
      <NovaColorPicker theme="dark" value="#1890ff" />
    </section>

    <!-- Props: language -->
    <section>
      <h4>language 属性</h4>
      <NovaColorPicker :language="zhCN" value="#1890ff" />
      <NovaColorPicker :language="enUS" value="#1890ff" />
    </section>

    <!-- Events: update -->
    <section>
      <h4>update 事件（JSX 专用）</h4>
      <NovaColorPicker value="#1890ff" @update="handleUpdate" />
    </section>

    <!-- Events: update:modelValue (JSX 直接使用) -->
    <section>
      <h4>modelValue + onUpdate:modelValue（JSX 风格）</h4>
      <NovaColorPicker :model-value="jsxColorValue" @update:model-value="handleUpdateModelValue" />
      <span class="value-display">值: {{ jsxColorValue }}</span>
    </section>

    <!-- Slots: trigger -->
    <section>
      <h4>trigger 插槽</h4>
      <NovaColorPicker value="#1890ff">
        <template #trigger="{ color }">
          <button class="custom-trigger" :style="{ backgroundColor: color.toHex() }">
            自定义触发器
          </button>
        </template>
      </NovaColorPicker>
    </section>

    <!-- Slots: preset -->
    <section>
      <h4>preset 插槽</h4>
      <NovaColorPicker :preset="presetColors" value="#1890ff">
        <template #preset="{ preset, setColorAndPosition }">
          <div class="custom-preset">
            <span
              v-for="c in preset"
              :key="c"
              class="preset-item"
              :style="{ backgroundColor: c }"
              @click="setColorAndPosition(c)"
            />
          </div>
        </template>
      </NovaColorPicker>
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

.custom-trigger {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.custom-preset {
  display: flex;
  gap: 4px;
  padding: 8px;
}

.preset-item {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
