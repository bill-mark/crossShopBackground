import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'manage',
    component: ()=>import('@/views/manage/index.vue'),
    redirect: { name: 'manage_home' },
    children:[
      {
        path:'home',
        name:'manage_home',
        component:()=>import(/* webpackChunkName: "manage_home" */ '@/views/manage/home.vue')
    },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
