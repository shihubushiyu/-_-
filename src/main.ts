import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css' //初始化css

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())

//让pinia仓库数据刷新不丢失 ！！！！！！！！！！！！！！！！！！
import { useMainStore } from './store/index'
const mainStore = useMainStore()
mainStore.mainCachePinia()

app.use(router)
app.mount('#app')
