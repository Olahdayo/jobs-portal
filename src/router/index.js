import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: () => import('../views/JobListings.vue')
    },
    {
      // path: '/create-job',
      // name: 'CreateJob',
      // component: () => import('../views/CreateJob.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/signup.vue')
    },
    {
      // path: '/faq',
      // name: 'FAQ',
      // component: () => import('../views/FAQ.vue')
    },
    {
      // path: '/contact',
      // name: 'Contact',
      // component: () => import('../views/Contact.vue')
    }
  ]
})

export default router
