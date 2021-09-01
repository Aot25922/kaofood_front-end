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
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
