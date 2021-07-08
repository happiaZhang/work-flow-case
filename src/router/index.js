import Vue from 'vue'
import VueRouter from 'vue-router'
import { OwnerMap } from '../constants/index.js'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    owners: [OwnerMap.JT2, OwnerMap.A, OwnerMap.B]
  },
  {
    path: '/intro',
    name: '介绍页',
    component: () => import(/* webpackChunkName: "intro" */ '../views/Intro.vue'),
    owners: [OwnerMap.JT2, OwnerMap.A, OwnerMap.B]
  },
  {
    path: '/product',
    name: '产品页',
    component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
    owners: [OwnerMap.JT2]
  },
  {
    path: '/project-a',
    name: '项目-A页',
    component: () => import(/* webpackChunkName: "projectA" */ '../views/ProjectA.vue'),
    owners: [OwnerMap.A]
  },
  {
    path: '/project-b',
    name: '项目-B页',
    component: () => import(/* webpackChunkName: "projectB" */ '../views/ProjectB.vue'),
    owners: [OwnerMap.B]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.filter(r => (r.owners.indexOf(process.env.PROJECT_ENV) > -1))
})

export default router
