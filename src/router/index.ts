import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/dashborad',
    component: () => import(/* webpackChunkName: "about" */ '../views/dashborad/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

