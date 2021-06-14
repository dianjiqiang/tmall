import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home.vue')
  },
  {
    path: '/category',
    name: 'CateGory',
    component: () => import('views/category/CateGory.vue')
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import('views/shopcart/ShopCart.vue')
  },
  {
    path: '/profile',
    name: 'ProFile',
    component: () => import('views/profile/ProFile.vue')
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: () => import('views/detail/Detail.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
