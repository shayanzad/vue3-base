import { createRouter, createWebHistory } from 'vue-router'
import PaneLayout from '@/layouts/pane-layout.vue'
import Auth from '@/layouts/auth-layout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PaneLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          title: 'داشبورد',
          component: () => import('../views/dashboard/index.vue'),
        },

        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/profiles/admin.vue'),

          title: ' ',

          meta: {
            title: 'پروفایل کاربر',
            guest: true,
            bredCroump: true,
          },
        },
        {
          path: '/stations/list',
          name: 'stations',
          component: () => import('../views/stations/list.vue'),
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'login',
          title: 'صفحه ورود',
          component: () => import('../views/auth/login.vue'),
        },
      ],
    },
  ],
})

export default router
