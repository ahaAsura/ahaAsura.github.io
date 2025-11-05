<script setup>
const cards = [
  { title: '今日临床会诊', value: 623, icon: '🏥', color: 'rgba(64,158,255,0.5)' },
  { title: '今日检查会诊', value: 623, icon: '🧪', color: 'rgba(255,99,132,0.5)' },
  { title: '今日门诊会诊', value: 623, icon: '👥', color: 'rgba(56,239,125,0.5)' },
]
</script>

<template>
  <div class="cards">
    <div class="card" v-for="c in cards" :key="c.title">
      <div class="title">{{ c.title }}</div>
      <div class="content">
        <div class="value">{{ c.value }}</div>
        <div class="avatar" :style="{ background: c.color }">{{ c.icon }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 1fr));
  gap: 16px;
}
.card {
  background: rgba(14, 52, 120, 0.6);
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 0 0 1px rgba(64,158,255,0.25) inset,
    0 8px 30px rgba(3, 23, 63, 0.6);
}
.title { color: #8fc6ff; font-size: 14px; }
.content { display: flex; align-items: center; justify-content: space-between; }
.value { font-size: 36px; font-weight: 800; color: #cfe8ff; }
.avatar { width: 56px; height: 56px; border-radius: 50%; display:flex; align-items:center; justify-content:center; }
</style>
