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
          path: '/',
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
          meta: {
            title: 'فهرست ایستگاه ها',
            guest: true,
            bredCroump: true,
          },
        },
        {
          path: '/stations/map',
          name: 'stationsMap',
          component: () => import('../views/stations/map.vue'),
          meta: {
            title: 'نمایش ایستگاه ها روی نقشه',
            guest: true,
            bredCroump: true,
          },
        },
        {
          path: '/drivers/list',
          name: 'driversList',
          component: () => import('../views/drivers/list.vue'),
          meta: {
            title: ' فهرست راننده ها',
            guest: true,
            bredCroump: true,
          },
        },
        {
          path: '/turns/list',
          name: 'turnsList',
          component: () => import('../views/turns/list.vue'),
          meta: {
            title: ' فهرست نوبت ها',
            guest: true,
            bredCroump: true,
          },
        },
        {
          path: '/cars/list',
          name: 'carsList',
          component: () => import('../views/cars/list.vue'),
          meta: {
            title: ' فهرست ناوگان',
            guest: true,
            bredCroump: true,
          },
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
