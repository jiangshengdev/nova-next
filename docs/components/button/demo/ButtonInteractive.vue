<script setup lang="ts">
import '@jiangshengdev/nova-next/styles/themes.css'
import '@jiangshengdev/nova-next/styles/button.css'
import { NovaButton } from '@jiangshengdev/nova-next'
import { ref } from 'vue'

const count = ref(0)
const busy = ref(false)

const handleAsyncClick = async () => {
  if (busy.value) {
    return
  }

  busy.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  count.value += 1
  busy.value = false
}

const reset = () => {
  if (busy.value) {
    return
  }

  count.value = 0
}
</script>

<template>
  <div class="demo-row">
    <NovaButton :disabled="busy" @click="handleAsyncClick">
      {{ busy ? '处理中…' : `点击次数 ${count}` }}
    </NovaButton>
    <NovaButton primary :disabled="busy" @click="reset">重置计数</NovaButton>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
