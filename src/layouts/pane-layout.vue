<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import navComponent from '@/components/base/nav.vue'
import MenuComponent from '@/components/base/sidebar/MenuComponent.vue'

import { useMenuStore } from '@/stores/global.js'

const menuStore = useMenuStore()

const sideBarItems = ref([
  {
    title: 'داشبورد',
    to: '/dashboard',
    icon: 'mdi-view-dashboard',
  },
  {
    title: 'منو یک',
    to: '/deposit-list',
    icon: 'mdi-archive-sync',
  },
  {
    title: 'منو کشویی',
    to: '',
    icon: 'mdi-office-building',
    children: [
      {
        title: 'مورد یک',
        to: '/branches/list',
        icon: '',
      },
    ],
  },
])
</script>
<template>
  <div>
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
        <div class="p-2">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- <div>footer</div> -->
  </div>
</template>
