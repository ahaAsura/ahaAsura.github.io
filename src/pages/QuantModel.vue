<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const days = ref(120)
const predictDays = ref(30)
const shortWin = ref(5)
const longWin = ref(20)
const resultText = ref('点击“开始预测”生成示例行情，并基于量化模型给出交易建议。')
const metrics = ref(null)
const chartRef = ref()
let chart

onMounted(() => {
  chart = echarts.init(chartRef.value)
  render([], [])
})

onBeforeUnmount(() => {
  chart?.dispose()
})

function generateDemoPrices(n) {
  // 简单随机游走模拟收盘价
  const arr = []
  let price = 100
  for (let i = 0; i < n; i++) {
    price = price * (1 + (Math.random() - 0.5) * 0.02)
    arr.push(Number(price.toFixed(2)))
  }
  return arr
}

function sma(series, window) {
  const out = []
  for (let i = 0; i < series.length; i++) {
    const start = Math.max(0, i - window + 1)
    const slice = series.slice(start, i + 1)
    out.push(slice.reduce((a, b) => a + b, 0) / slice.length)
  }
  return out
}

function linRegForecast(series, nFuture) {
  const N = series.length
  const xs = Array.from({ length: N }, (_, i) => i + 1)
  const sumX = xs.reduce((a, b) => a + b, 0)
  const sumY = series.reduce((a, b) => a + b, 0)
  const sumXY = xs.reduce((a, x, i) => a + x * series[i], 0)
  const sumXX = xs.reduce((a, x) => a + x * x, 0)
  const denom = N * sumXX - sumX * sumX
  const slope = (N * sumXY - sumX * sumY) / denom
  const intercept = (sumY - slope * sumX) / N

  const pred = []
  for (let k = 1; k <= nFuture; k++) {
    const x = N + k
    pred.push(intercept + slope * x)
  }
  return { slope, pred }
}

function run() {
  const src = generateDemoPrices(Number(days.value))
  const { slope, pred } = linRegForecast(src, Number(predictDays.value))
  const smaShort = sma(src, Number(shortWin.value))
  const smaLong = sma(src, Number(longWin.value))
  const lastPrice = src.at(-1)
  const forecastEnd = pred.at(-1)
  const expectedReturn = forecastEnd && lastPrice ? (forecastEnd - lastPrice) / lastPrice : 0

  let advice
  if (slope > 0 && smaShort.at(-1) > smaLong.at(-1)) advice = '趋势向上，建议逢低做多' 
  else if (slope < 0 && smaShort.at(-1) < smaLong.at(-1)) advice = '趋势向下，建议谨慎或做空对冲'
  else advice = '趋势不明，保持观望'
  resultText.value = `线性趋势斜率：${slope.toFixed(4)}。${advice} 预计${predictDays.value}天后目标价：${forecastEnd?.toFixed(2)}，预期收益率约 ${(expectedReturn * 100).toFixed(2)}%。`
  metrics.value = {
    lastPrice,
    forecastEnd,
    expectedReturn,
    slope,
    advice
  }

  render(src, pred, smaShort, smaLong)
}

function render(src, pred = [], smaShort = [], smaLong = []) {
  const option = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 30, bottom: 30 },
    legend: { textStyle: { color: '#cfe8ff' } },
    xAxis: { type: 'category', data: Array.from({ length: (src?.length || 0) + pred.length }, (_, i) => i + 1), axisLine: { lineStyle: { color: '#6aa0ff' } } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#6aa0ff' } }, splitLine: { lineStyle: { color: 'rgba(106,160,255,.25)' } } },
    series: [
      { name: '收盘价', type: 'line', data: src, showSymbol: false, lineStyle: { color: '#2dd9ff' } },
      { name: '短期SMA', type: 'line', data: smaShort, showSymbol: false, lineStyle: { color: '#ffd166' } },
      { name: '长期SMA', type: 'line', data: smaLong, showSymbol: false, lineStyle: { color: '#ef476f' } },
      { name: '预测', type: 'line', data: Array(src.length).fill(null).concat(pred), showSymbol: false, lineStyle: { color: '#8cff66', type: 'dashed' } },
    ]
  }
  chart.setOption(option)
}
</script>

<template>
  <div class="quant">
    <el-page-header @back="$router.back()" content="量化预测" title="返回" />

    <div class="toolbar">
      <el-input-number v-model="days" :min="50" :max="500" label="训练天数" />
      <el-input-number v-model="predictDays" :min="5" :max="120" label="预测天数" />
      <el-input-number v-model="shortWin" :min="3" :max="60" label="短期SMA" />
      <el-input-number v-model="longWin" :min="5" :max="200" label="长期SMA" />
      <el-button type="primary" @click="run">开始预测</el-button>
    </div>

    <p class="hint">{{ resultText }}</p>

    <el-card v-if="metrics" class="metrics" shadow="hover">
      <el-descriptions :column="2" size="small" border>
        <el-descriptions-item label="最新收盘价">{{ metrics.lastPrice?.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="预测终值">{{ metrics.forecastEnd?.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="预期收益">{{ (metrics.expectedReturn * 100).toFixed(2) }}%</el-descriptions-item>
        <el-descriptions-item label="模型结论">{{ metrics.advice }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <div ref="chartRef" class="chart" />
  </div>
</template>

<style scoped>
.quant { min-height: 100vh; padding: 16px; background: radial-gradient(800px 480px at 50% 30%, rgba(18,54,126,.6), rgba(3,16,51,1)), #061b43; }
.toolbar { display:flex; flex-wrap: wrap; gap: 12px; align-items:center; margin: 12px 0; }
.chart { height: 520px; background: rgba(8,30,84,0.35); border-radius: 12px; }
.hint { color:#9ad0ff; margin: 8px 0 12px; }
.metrics { background: rgba(8,30,84,0.35); border-radius: 12px; color: #d1ecff; }
:deep(.el-descriptions__label) { color: #8fc6ff; }
:deep(.el-descriptions__content) { color: #d1ecff; }
</style>
