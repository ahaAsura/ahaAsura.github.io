<script setup>
import HeaderBar from '../components/HeaderBar.vue'
import StatCards from '../components/StatCards.vue'
import FilterBar from '../components/FilterBar.vue'
import RankList from '../components/RankList.vue'
import CenterNetwork from '../components/CenterNetwork.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goQuant = () => router.push('/quant')
</script>

<template>
  <div class="page">
    <HeaderBar />

    <section class="top">
      <div class="spacer left-title">
        <div class="panel-title">牵头医院</div>
      </div>
      <div class="cards-wrap">
        <StatCards />
        <FilterBar />
      </div>
      <div class="spacer right-title" style="display:flex;justify-content:space-between;align-items:center;">
        <div class="panel-title">医疗集团</div>
        <el-button type="primary" size="small" @click="goQuant">量化预测</el-button>
      </div>
    </section>

    <section class="main">
      <div class="side left">
        <RankList title="临床会诊服务排行榜" />
        <div style="height:24px" />
        <RankList title="检查会诊服务排行榜" />
      </div>
      <div class="center">
        <CenterNetwork />
      </div>
      <div class="side right">
        <RankList title="临床会诊服务排行榜" />
        <div style="height:24px" />
        <RankList title="门诊会诊服务排行榜" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: radial-gradient(1000px 600px at 50% 60%, rgba(18,54,126,.8), rgba(3,16,51,1)), #061b43;
}
.top {
  display: grid;
  grid-template-columns: 320px 1fr 320px;
  align-items: center;
  gap: 16px;
  padding: 14px 16px 0 16px;
}
.panel-title { color:#8fc6ff; font-weight:900; letter-spacing:1px; }
.cards-wrap { display:flex; flex-direction:column; gap:12px; }
.main {
  display: grid;
  grid-template-columns: 360px 1fr 360px;
  gap: 16px;
  padding: 8px 16px 24px 16px;
}
.side { background: rgba(8,30,84,0.35); border-radius: 12px; padding: 10px; }
.center { background: rgba(8,30,84,0.35); border-radius: 12px; padding: 10px; }
</style>
