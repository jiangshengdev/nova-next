<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton, zhCN, enUS } from '@jiangshengdev/nova-next'
import { h } from 'vue'

const handleClick = () => {
  console.log('Button clicked')
}

const iconNode = h('span', '⭐')
</script>

<template>
  <div class="demo-container">
    <!-- Props: primary -->
    <section>
      <h4>primary 属性</h4>
      <NovaButton>默认</NovaButton>
      <NovaButton primary>主要</NovaButton>
    </section>

    <!-- Props: icon -->
    <section>
      <h4>icon 属性</h4>
      <NovaButton :icon="iconNode">带图标</NovaButton>
      <NovaButton :icon="iconNode" />
    </section>

    <!-- Props: disabled -->
    <section>
      <h4>disabled 属性</h4>
      <NovaButton disabled>禁用</NovaButton>
      <NovaButton primary disabled>主要禁用</NovaButton>
    </section>

    <!-- Props: type -->
    <section>
      <h4>type 属性</h4>
      <NovaButton type="button">button</NovaButton>
      <NovaButton type="submit">submit</NovaButton>
      <NovaButton type="reset">reset</NovaButton>
    </section>

    <!-- Props: theme -->
    <section>
      <h4>theme 属性</h4>
      <NovaButton theme="light">Light 主题</NovaButton>
      <NovaButton theme="dark">Dark 主题</NovaButton>
    </section>

    <!-- Props: language -->
    <section>
      <h4>language 属性</h4>
      <NovaButton :language="zhCN">中文</NovaButton>
      <NovaButton :language="enUS">English</NovaButton>
    </section>

    <!-- Slots: default -->
    <section>
      <h4>default 插槽</h4>
      <NovaButton>
        <span style="color: red">自定义内容</span>
      </NovaButton>
      <NovaButton>
        <template #default>
          <span style="color: blue">具名 default</span>
        </template>
      </NovaButton>
    </section>

    <!-- Slots: icon -->
    <section>
      <h4>icon 插槽</h4>
      <NovaButton>
        <template #icon>
          <span>🚀</span>
        </template>
        图标插槽
      </NovaButton>
    </section>

    <!-- Events: click -->
    <section>
      <h4>click 事件</h4>
      <NovaButton @click="handleClick">点击触发事件</NovaButton>
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
</style>
