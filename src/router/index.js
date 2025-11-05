import { createRouter, createWebHashHistory } from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const QuantModel = () => import('../pages/QuantModel.vue')

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/quant', name: 'QuantModel', component: QuantModel },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

export default router
