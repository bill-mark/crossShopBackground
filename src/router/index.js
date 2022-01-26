import Vue from "vue";
import VueRouter from "vue-router";

const original = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
    meta: {
      needLogin: false, // 不需要登录
    },
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("@/views/manage/index.vue"),
    redirect: { name: "manage_home" },
    meta: {
      needLogin: true, // 需要登录
    },
    children: [
      {
        path: "home",
        name: "manage_home",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "manage_home" */ "@/views/manage/home.vue"),
      },
      {
        path: "environment",
        name: "manage_environment",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "manage_environment" */ "@/views/manage/environment.vue"),
      },
      {
        path: "equipment",
        name: "manage_equipment",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "equipment" */ "@/views/equipment/index.vue"),
      },
      {
        path: "member",
        name: "manage_member",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "manage_member" */ "@/views/member/index.vue"),
      },
      {
        path: "addenv",
        name: "manage_addenv",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "addenv" */ "@/views/manage/add_enviroment.vue"),
      },
      {
        path: "editenv",
        name: "manage_editenv",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "addenv" */ "@/views/manage/edit_environment.vue"),
      },
      {
        path: "security",
        name: "manage_security",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "security" */ "@/views/security/index.vue"),
        redirect: { name: "member_security" },
        children: [
          {
            path: "member",
            name: "member_security",
            component: () => import(/* webpackChunkName: "member" */ "@/views/security/member.vue"),
            meta: {
              needLogin: true, // 需要登录
            },
          },
          {
            path: "terminal",
            name: "terminal_security",
            component: () => import(/* webpackChunkName: "terminal" */ "@/views/security/terminal.vue"),
            meta: {
              needLogin: true, // 需要登录
            },
          },
        ],
      },
      {
        path: "fee",
        name: "manage_fee",
        meta: {
          needLogin: true, // 需要登录
        },
        component: () => import(/* webpackChunkName: "fee" */ "@/views/fee/index.vue"),
        redirect: { name: "charge_fee" },
        children: [
          {
            path: "charge",
            name: "charge_fee",
            component: () => import(/* webpackChunkName: "charge_fee" */ "@/views/fee/charge_fee.vue"),
            meta: {
              needLogin: true, // 需要登录
            },
          },
          {
            path: "order",
            name: "order_fee",
            component: () => import(/* webpackChunkName: "order_fee" */ "@/views/fee/order_fee.vue"),
            meta: {
              needLogin: true, // 需要登录
            },
          },
          {
            path: "balance",
            name: "balance_fee",
            component: () => import(/* webpackChunkName: "balance_fee" */ "@/views/fee/balance_fee.vue"),
            meta: {
              needLogin: true, // 需要登录
            },
          },
          {
            path:'invite',
            name:'invite_fee',
            component:()=>import(/* webpackChunkName: "invite_fee" */ '@/views/fee/invite_fee.vue'),
            meta: {
              needLogin: true // 需要登录
            }
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    redirect: { name: "login_login" },
    meta: {
      needLogin: false, // 不需要登录
    },
    children: [
      {
        path: "login",
        name: "login_login",
        meta: {
          needLogin: false, // 不需要登录
        },
        component: () => import(/* webpackChunkName: "login_login" */ "@/views/login/login.vue"),
      },
      {
        path: "company",
        name: "login_company",
        meta: {
          needLogin: false, // 不需要登录
        },
        component: () => import(/* webpackChunkName: "login_company" */ "@/views/login/login_company.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.token;
  if (to.meta.needLogin) {
    // 判断该路由是否需要登录权限
    if (isLogin) {
      // 判断是否已经登录
      next();
    } else {
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});

export default router;
