import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
  },
  {
    path: '/menu/:id',
    name: 'MenuInfo',
    component: ()=> import('../components/MenuInfo.vue')
  },
  {
    path: '/menu/add',
    name: 'AddMenu',
    component: () => import('../components/MenuForm.vue'),
  },
  {
    path: '/menu/edit/:id',
    name: 'EditMenu',
    component: () => import('../components/MenuForm.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ()=> import('../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/AccountForm.vue'),
    props: { mode: 'Login' }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/AccountForm.vue'),
    props: { mode: 'SignUp' }
  },
  {
    path: '/editAccount/:id',
    name: 'EditAccount',
    component: () => import('../views/AccountForm.vue'),
    props: { mode: 'Edit' }
  },
  {
    path: '/orderManage',
    name: 'OrderManage',
    component: ()=> import('../components/Admin/OrderManage.vue')
  },
  {
    path: '/accountManage',
    name: 'AcoountManage',
    component: ()=> import('../components/Admin/AccountManage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
