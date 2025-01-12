<template>
  <div class="p-2">
    <nav class="flex justify-between items-center">
      <div>
        <v-btn @click="togglemenuBtn" class="mr-2" variant="text" icon="mdi-menu"></v-btn>
        <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/about" class="mx-2">About</RouterLink>
        <RouterLink to="/auth/login" class="mx-2">login</RouterLink>
      </div>
      <div>
        <div class="text-center flex">
          <DropMenue title="پروفایل کاربر" count="10" icon="bell-ring-outline" />
          <DropMenue title="صندوق ورودی" count="25" icon="inbox-arrow-down" />
          <!-- <v-icon @click="toggleDrawerSettings">mdi-account</v-icon> -->
          <v-avatar @click="goToProfile" size="large" class="cursor-pointer">
            <v-icon size="30" :icon="`mdi-account`"></v-icon>
          </v-avatar>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import DropMenue from './dropMenu.vue'
import { ref } from 'vue'
const router = useRouter()

import { useMenuStore } from '@/stores/global.js'

const menuStore = useMenuStore()
const togglemenuBtn = () => {
  console.log('ppppppppp')
  if (menuStore.isMenuOpen == true) {
    menuStore.closeMenu()
  } else {
    menuStore.openMenu()
  }
}
const goToProfile = () => {
  router.push('/profile')
}
const toggleDrawerSettings = () => {
  console.log(menuStore.isDrawerSettingsOpen)
  if (menuStore.isDrawerSettingsOpen == true) {
    menuStore.closeDrawerSettings()
  } else {
    menuStore.openDrawerSettings()
  }
}
</script>
