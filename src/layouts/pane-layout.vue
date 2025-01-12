<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import navComponent from '@/components/base/nav.vue'
import MenuComponent from '@/components/base/sidebar/MenuComponent.vue'

import { useMenuStore } from '@/stores/global.js'
const menuStore = useMenuStore()
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
    to: '/dashboard',
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
        to: '/drivers/list',
        icon: '',
      },
      // {
      //   title: '  ثبت',
      //   to: '/branches/list',
      //   icon: '',
      // },
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
                  <img width="80px" src="../assets/images/logoTaxi.png" />
                  <img width="50px" class="ml-3" src="../assets/images/taxi-svg.svg" />
                </div>
                <MenuComponent :menu-item="sideBarItems" />
              </div>
              <div>
                <img width="80px" class="ml-3" src="../assets/images/taxi-svg.svg" />
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
