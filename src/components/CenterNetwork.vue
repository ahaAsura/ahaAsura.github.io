<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart

onMounted(() => {
  chart = echarts.init(chartRef.value)
  render()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart && chart.dispose()
})

function resize() {
  chart && chart.resize()
}

function render() {
  const center = { x: 0, y: 0 }
  const radius = 220
  const names = ['集团医院1','集团医院2','集团医院3','集团医院4','集团医院5','集团医院6']
  const nodes = [
    { name: '牵头医院', x: center.x, y: center.y, symbolSize: 80 },
    ...names.map((n, i) => {
      const angle = (i / names.length) * Math.PI * 2
      return { name: n, x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius, symbolSize: 50 }
    })
  ]

  const links = names.map((n) => ({ source: '牵头医院', target: n }))

  const option = {
    backgroundColor: 'transparent',
    animationDuration: 1200,
    tooltip: { trigger: 'item' },
    series: [
      {
        type: 'graph',
        layout: 'none',
        coordinateSystem: null,
        data: nodes,
        links,
        roam: false,
        label: { show: true, color: '#cfe8ff', fontWeight: 'bold' },
        itemStyle: {
          color: function (params) {
            return params.data.name === '牵头医院' ? '#4cc3ff' : '#67e0e3'
          },
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.45)'
        },
        lineStyle: { color: 'rgba(80,160,255,0.6)', width: 2 },
        emphasis: { scale: true }
      }
    ]
  }

  chart.setOption(option)
}
</script>

<template>
  <div class="center">
    <div ref="chartRef" class="chart" />
  </div>
</template>

<style scoped>
.center { width: 100%; height: 560px; position: relative; }
.chart { position: absolute; inset: 0; }
</style>
