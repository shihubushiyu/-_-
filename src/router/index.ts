import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' //一般导入类型时候可以在这里写一个type，不加也没问题
import cache from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('../views/main/main.vue'),
    redirect: '/main/home',
    children: [{ path: 'home', name: 'home', component: () => import('../components/home/HomePage.vue') }]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/NotFount.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = cache.getCache('token')
    if (!token) {
      return { path: '/login' }
    }
  }
})

export default router
