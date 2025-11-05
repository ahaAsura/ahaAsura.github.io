<script setup>
import { onMounted, ref } from 'vue'

const graphRef = ref()

const options = {
  debug: false,
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  defaultExpandHolderPosition: 'bottom',
  defaultLineColor: 'rgba(80,160,255,0.6)',
  defaultNodeBorderColor: 'rgba(64,158,255,0.8)',
  defaultNodeColor: 'rgba(73,181,255,0.45)',
  backgroundColor: 'transparent',
}

onMounted(() => {
  render()
})

function render() {
  const center = { x: 0, y: 0 }
  const radius = 220
  const names = ['集团医院1','集团医院2','集团医院3','集团医院4','集团医院5','集团医院6']

  const nodes = [
    { id: 'center', text: '牵头医院', x: center.x, y: center.y, fontColor: '#cfe8ff', color: '#4cc3ff', borderColor: '#7cd1ff', width: 120, height: 60 },
    ...names.map((name, i) => {
      const angle = (i / names.length) * Math.PI * 2
      return {
        id: `n${i}`,
        text: name,
        x: center.x + Math.cos(angle) * radius,
        y: center.y + Math.sin(angle) * radius,
        color: 'rgba(103,224,227,0.6)',
        borderColor: '#40a9ff',
        width: 110,
        height: 52,
      }
    })
  ]

  const lines = names.map((_, i) => ({ from: 'center', to: `n${i}`, color: 'rgba(80,160,255,0.8)' }))
  const links = names.map((_, i) => ({ from: 'center', to: `n${i}`, color: 'rgba(80,160,255,0.8)' }))

  graphRef.value.setJsonData({ rootId: 'center', nodes, lines, links })
}
</script>

<template>
  <div class="center">
    <relation-graph ref="graphRef" :options="options" class="graph" />
  </div>
  
</template>

<style scoped>
.center { width: 100%; height: 560px; position: relative; }
.graph { position: absolute; inset: 0; }
</style>
