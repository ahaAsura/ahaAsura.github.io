<script setup>
import { ref } from 'vue'

const statusText = ref('Element Plus 已准备就绪，点击按钮体验组件。')

const handleClick = () => {
  const time = new Date().toLocaleTimeString()
  statusText.value = `按钮已在 ${time} 点击！`
}
</script>

<template>
  <main class="container">
    <h1>Vue 3 + Element Plus 集成成功</h1>
    <p>下方按钮来自 Element Plus 组件库：</p>
    <el-button type="primary" @click="handleClick">Element Plus 测试按钮</el-button>
    <p class="status">{{ statusText }}</p>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.status {
  margin: 0;
  font-size: 1.1rem;
  color: #409eff;
}
</style>
