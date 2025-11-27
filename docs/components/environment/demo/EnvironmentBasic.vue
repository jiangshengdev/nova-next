<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaEnvironment, NovaButton } from '@jiangshengdev/nova-next'
</script>

<template>
  <div class="demo-column">
    <section class="demo-surface">
      <p class="demo-title">继承默认 theme</p>
      <NovaButton>默认主题</NovaButton>
    </section>

    <NovaEnvironment theme="dark">
      <section class="demo-surface" data-nova-theme="dark">
        <p class="demo-title">局部覆盖为 dark</p>
        <NovaButton primary>深色主题</NovaButton>
      </section>
    </NovaEnvironment>

    <NovaEnvironment theme="light">
      <section class="demo-surface" data-nova-theme="light">
        <p class="demo-title">局部覆盖为 light</p>
        <NovaButton primary>浅色主题</NovaButton>
      </section>
    </NovaEnvironment>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.demo-surface {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
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
