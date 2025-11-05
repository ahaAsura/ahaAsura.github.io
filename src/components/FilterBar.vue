<script setup>
import { ref } from 'vue'

const period = ref('今日')
const categories = ref(['临床会诊', '检查会诊', '门诊会诊', '诊间会诊'])
const active = ref('临床会诊')
</script>

<template>
  <div class="filter">
    <div class="left">
      <el-button-group>
        <el-button :type="period==='今日' ? 'primary' : 'default'" @click="period='今日'">今日</el-button>
        <el-button :type="period==='本周' ? 'primary' : 'default'" @click="period='本周'">本周</el-button>
        <el-button :type="period==='本月' ? 'primary' : 'default'" @click="period='本月'">本月</el-button>
      </el-button-group>
    </div>
    <div class="right">
      <el-button
        v-for="c in categories"
        :key="c"
        size="small"
        round
        :type="active===c? 'primary' : 'default'"
        @click="active=c"
      >{{ c }}</el-button>
    </div>
  </div>
</template>

<style scoped>
.filter { display:flex; align-items:center; justify-content:space-between; margin-top:12px; }
.right { display:flex; gap:8px; }
</style>
