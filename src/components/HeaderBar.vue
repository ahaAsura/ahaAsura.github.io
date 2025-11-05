<script setup>
</script>

<template>
  <header class="header">
    <div class="brand">医疗集团运营监管</div>
    <div class="nav-actions">
      <nav class="nav">
        <a class="nav-item active">医疗卫生业务概览</a>
        <a class="nav-item">医师行为动态监测</a>
        <a class="nav-item">院间转诊工作量分析</a>
        <a class="nav-item">院间会诊工作量分析</a>
      </nav>
      <el-button type="primary" size="small" class="quant-btn" @click="$router.push('/quant')">量化模型预测</el-button>
    </div>
  </header>
  <div class="subline" />
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 24px;
  color: #bfe3ff;
}
.brand {
  font-weight: 900;
  font-size: 24px;
  letter-spacing: 2px;
  color: #c9e6ff;
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}
.nav {
  display: flex;
  gap: 24px;
}
.nav-item {
  color: #bfe3ff;
  padding: 8px 14px;
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(46,99,255,0.25), rgba(13,48,123,0.25));
}
.nav-item.active {
  box-shadow: 0 0 0 1px rgba(64,158,255,0.5) inset, 0 0 12px rgba(64,158,255,0.5);
}
.quant-btn {
  box-shadow: 0 0 12px rgba(64,158,255,0.4);
}
.subline {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(64,158,255,0.35), transparent);
}
</style>
