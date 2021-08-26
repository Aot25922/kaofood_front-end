import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
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
