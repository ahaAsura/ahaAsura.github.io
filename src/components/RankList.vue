<script setup>
const props = defineProps({
  title: { type: String, required: true },
})

const items = [
  { name: '上级医院-北院区', value: 86 },
  { name: '上级医院-南院区', value: 72 },
  { name: '中心医院-东院区', value: 64 },
  { name: '中心医院-西院区', value: 42 },
  { name: '附属医院-新区', value: 33 },
]
</script>

<template>
  <section class="panel">
    <div class="panel-title">{{ title }}<span>TOP5</span></div>
    <ul class="list">
      <li v-for="(it,idx) in items" :key="it.name" class="row">
        <div class="tag">NO.{{ idx+1 }}</div>
        <div class="name">{{ it.name }}</div>
        <div class="bar">
          <div class="inner" :style="{ width: it.value + '%'}"></div>
        </div>
        <div class="val">{{ it.value }}</div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel { padding: 12px 8px; }
.panel-title { color:#cfe8ff; font-weight:800; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.panel-title span { color:#8fc6ff; font-weight:700; font-size:12px; }
.list { display:flex; flex-direction:column; gap:10px; }
.row { display:grid; grid-template-columns: 64px 1fr 180px 36px; align-items:center; gap:8px; }
.tag { background: linear-gradient(90deg,#ffde59,#ff9a3c); color:#0b2458; font-weight:900; font-size:12px; padding:4px 8px; border-radius:6px; text-align:center; }
.name { color:#cfe8ff; font-size:12px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bar { height:8px; background:rgba(21,55,126,.5); border-radius:8px; overflow:hidden; }
.inner { height:100%; background: linear-gradient(90deg,#2dd9ff,#3a86ff); }
.val { color:#9ad0ff; font-size:12px; text-align:right; }
</style>
