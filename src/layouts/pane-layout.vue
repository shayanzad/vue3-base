<script setup>
import { ref } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import navComponent from '@/components/base/nav.vue'
import MenuComponent from '@/components/base/sidebar/MenuComponent.vue'

import { useGlobalStore } from '@/stores/global.js'
const menuStore = useGlobalStore()
const route = useRoute()
const router = useRouter()
const userData = ref({
  name: 'شایان',
  family: 'آزادبخت',
  userName: '09160186390',
  nationalCode: '4190513571',
})
const sideBarItems = ref([
  {
    title: 'داشبورد',
    to: '/',
    icon: 'mdi-view-dashboard',
  },

  {
    title: 'ایستگاه ها',
    to: '',
    icon: 'mdi-office-building',
    children: [
      // {
      //   title: 'ثبت ',
      //   to: '/branches/list',
      //   icon: '',
      // },
      {
        title: 'فهرست',
        to: '/stations/list',
        icon: '',
      },
      {
        title: 'نقشه',
        to: '/stations/map',
        icon: '',
      },
    ],
  },
  {
    title: 'راننده ها',
    to: '',
    icon: 'mdi-card-account-details-outline',
    children: [
      {
        title: '  فهرست',
        to: '/drivers',
        icon: '',
      },
    ],
  },
  {
    title: 'نوبت ها',
    to: '',
    icon: 'mdi-format-list-numbered-rtl',
    children: [
      {
        title: '  فهرست نوبت ها',
        to: '/turns/list',
        icon: '',
      },
    ],
  },
  {
    title: ' ناوگان',
    to: '',
    icon: 'mdi-car-search-outline',
    children: [
      {
        title: 'فهرست ناوگان',
        to: '/cars/list',
        icon: '',
      },
    ],
  },
  {
    title: 'کاربران',
    to: '',
    icon: 'mdi-account-group-outline',
    children: [
      {
        title: 'فهرست مدیران ایستگاه',
        to: '/users/station-managers',
        icon: '',
      },

      {
        title: 'فهرست مدیران سیستم',
        to: '/users/admins',
        icon: '',
      },
      {
        title: 'فهرست شرکت ها',
        to: '/users/companies',
        icon: '',
      },
    ],
  },
])
</script>
<template>
  <div>
    <v-layout>
      <v-navigation-drawer
        v-model="menuStore.isDrawerSettingsOpen"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary
      >
        <div class="p-3">
          <div class="rounded-full border p-4 flex justify-center items-center">
            <v-icon size="50">mdi-account</v-icon>
          </div>

          <div>
            <div class="my-4">
              <span class="text-gray-500">نام : </span>
              <span>{{ userData.name }}</span>
            </div>
            <div class="my-4">
              <span class="text-gray-500">نام خانوادگی : </span>
              <span>{{ userData.family }}</span>
            </div>
            <div class="my-4">
              <span class="text-gray-500">نام کاربری : </span>
              <span>{{ userData.userName }}</span>
            </div>
            <div class="my-4">
              <span class="text-gray-500"> شماره ملی : </span>
              <span>{{ userData.nationalCode }}</span>
            </div>
          </div>
        </div>
      </v-navigation-drawer>
      <div class="flex w-full">
        <div
          style="transition: all 0.2s"
          :class="menuStore.isMenuOpen == true ? 'w-[240px] ' : 'w-[0px]'"
        >
          <div
            class="flex bg-white h-[100vh]"
            style="box-shadow: 0px 0px 15px #8080805c"
            :class="menuStore.isMenuOpen == true ? '  ' : 'hidden'"
          >
            <div class="p-2 w-full flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-center mt-1 mb-4">
                  <img width="50px" class="ml-3" src="../assets/images/taxi-svg.svg" />
                  <img width="80px" src="../assets/images/mgram.svg" />
                </div>
                <MenuComponent :menu-item="sideBarItems" />
              </div>
              <div class="flex justify-center items-center mb-6">
                <!-- <img width="80px" class="ml-3" src="../assets/images/taxi-svg.svg" /> -->
                <span>طراحی شده توسط <span class="text-primary-900">شایان پردازش</span></span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <header>
            <navComponent />
          </header>
          <div class="px-10 max-w-[1248px] mx-auto">
            <div>
              <div
                class="mt-5 mb-5 px-6 py-5 rounded-3xl shadowLight bg-withe"
                v-if="route.meta.bredCroump == true"
              >
                <div class="flex justify-between items-center">
                  <div class="bredCroumpTitle">{{ route.meta?.title }}</div>
                  <div>
                    <v-btn
                      variant="text"
                      @click="router.back()"
                      class="flex justify-center items-center"
                    >
                      <span class="mx-1">بازگشت</span>
                      <!-- <img width="20px" src="../assets/icons/previous.png"/> -->
                    </v-btn>
                  </div>
                </div>
              </div>
              <slot></slot>
            </div>
            <RouterView />
          </div>
        </div>
      </div>
    </v-layout>
    <!-- <div>footer</div> -->
  </div>
</template>
