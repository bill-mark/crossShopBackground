import Vue from 'vue'
import VueRouter from 'vue-router'

const original = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err)
}


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
      {
        path:'environment',
        name:'manage_environment',
        component:()=>import(/* webpackChunkName: "manage_environment" */ '@/views/manage/environment.vue')
      }, 
      {
        path:'equipment',
        name:'manage_equipment',
        component:()=>import(/* webpackChunkName: "equipment" */ '@/views/equipment/index.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
