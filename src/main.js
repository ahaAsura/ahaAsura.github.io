import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import RelationGraph from 'relation-graph'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(RelationGraph)

app.mount('#app')
