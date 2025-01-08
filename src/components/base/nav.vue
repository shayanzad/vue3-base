<template>
  <div class="p-2">
    <nav class="flex justify-between items-center">
      <div>
        <v-btn @click="togglemenuBtn" class="mr-2" icon="mdi-menu"></v-btn>
        <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/about" class="mx-2">About</RouterLink>
        <RouterLink to="/auth/login" class="mx-2">login</RouterLink>
      </div>
      <div>
        <div class="text-center flex">
          <DropMenue title="پروفایل کاربر" count="10" icon="bell-ring-outline" />
          <DropMenue title="صندوق ورودی" count="25" icon="inbox-arrow-down" />
          <DropMenue />
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import DropMenue from './dropMenu.vue'
import { ref } from 'vue'

import { useMenuStore } from '@/stores/global.js'

const menuStore = useMenuStore()
const togglemenuBtn = () => {
  console.log('ppppppppp')
  if (menuStore.isMenuOpen == true) {
    menuStore.closeMenu()
  } else {
    menuStore.openMenu()
  }
  console.log(menuStore.isMenuOpen)
}
const menu = ref(false)
</script>
