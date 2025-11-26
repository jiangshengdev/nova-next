<script setup lang="ts">
import { computed, ref } from 'vue'
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/input.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton, NovaInput } from '@jiangshengdev/nova-next'

const message = ref('')
const isRequired = ref(false)
const characterCount = computed(() => message.value.length)

const toggleRequired = () => {
  isRequired.value = !isRequired.value
}

const clearInput = () => {
  message.value = ''
}

const submit = () => {
  window.alert(`提交的内容: ${message.value || '（空）'}`)
}
</script>

<template>
  <div class="demo-column">
    <div>
      <p class="demo-title">字符计数</p>
      <div class="demo-row demo-align-center">
        <NovaInput v-model="message" placeholder="输入内容查看计数" />
        <span class="demo-tip">字符数：{{ characterCount }}</span>
      </div>
    </div>

    <div>
      <p class="demo-title">动态切换状态</p>
      <div class="demo-row">
        <NovaInput :required="isRequired" :placeholder="isRequired ? '必填字段' : '非必填字段'" />
        <NovaButton @click="toggleRequired">
          {{ isRequired ? '取消必填' : '设为必填' }}
        </NovaButton>
      </div>
    </div>

    <div>
      <p class="demo-title">表单操作</p>
      <div class="demo-row">
        <NovaInput v-model="message" placeholder="输入一些内容" />
        <NovaButton @click="clearInput">清空</NovaButton>
        <NovaButton primary @click="submit">提交</NovaButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-align-center {
  align-items: center;
}

.demo-title {
  margin: 0 0 8px;
  font-size: 14px;
}

.demo-tip {
  font-size: 13px;
}
</style>
