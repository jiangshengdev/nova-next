<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/dropdown.css'
import '@jiangshengdev/nova-next/styles/color-picker.css'
import { NovaColorPicker, NovaEnvironment, enUS, zhCN } from '@jiangshengdev/nova-next'
</script>

<template>
  <div class="demo-column">
    <section class="demo-surface">
      <p class="demo-title">继承默认 language</p>
      <NovaColorPicker value="#409eff" :preset="['#409eff', '#67c23a']" />
    </section>

    <NovaEnvironment :language="enUS" theme="dark">
      <section class="demo-surface" data-nova-theme="dark">
        <p class="demo-title">局部 en-US</p>
        <NovaColorPicker value="#909399" :preset="['#909399', '#303133']" />
      </section>
    </NovaEnvironment>

    <NovaEnvironment :language="zhCN" theme="light">
      <section class="demo-surface" data-nova-theme="light">
        <p class="demo-title">局部中文语言</p>
        <NovaColorPicker value="#f56c6c" :preset="['#f56c6c', '#e6a23c']" />
      </section>
    </NovaEnvironment>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-surface {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
}

.demo-surface[data-nova-theme='light'] {
  background-color: var(--nova-color-bg);
  color: var(--nova-color-font);
}

.demo-surface[data-nova-theme='dark'] {
  background-color: var(--nova-color-bg);
  color: var(--nova-color-font);
}

.demo-title {
  margin: 0;
  font-size: 14px;
}
</style>
