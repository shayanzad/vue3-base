<template>
  <div class="p-2">
    <nav class="flex justify-between items-center">
      <div>
        <v-btn @click="togglemenuBtn" class="mr-2" variant="text" icon="mdi-menu"></v-btn>
        <!-- <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/about" class="mx-2">About</RouterLink> -->
        <!-- <RouterLink to="/auth/login" class="mx-2">login</RouterLink> -->
      </div>
      <div>
        <div class="text-center flex">
          <!-- <DropMenue title="پروفایل کاربر" count="10" icon="bell-ring-outline" />
          <DropMenue title="صندوق ورودی" count="25" icon="inbox-arrow-down" /> -->
          <DropMenue title="صندوق ورودی" count="25" icon="account">
            <template #content>
              <v-list>
                <v-list-item
                  prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  :subtitle="menuStore.getRoleText()"
                  :title="userData.name + ' ' + userData.lastname"
                  @click="goToProfile"
                >
                  <template v-slot:append>
                    <v-btn :class="fav ? 'text-red' : ''" icon="mdi-heart" variant="text"></v-btn>
                  </template>
                </v-list-item>
                <!-- <v-list-item>
                  <template v-slot:append>
                    <v-btn @click="goToProfile" class="w-full"> حساب کاربری</v-btn>
                  </template>
                </v-list-item> -->
                <v-list-item>
                  <v-btn
                    @click="logOutFunction"
                    block
                    variant="outlined"
                    color="red"
                    class="flex justify-center items-center"
                  >
                    <span class="mx-2">خروج </span>
                    <v-icon class="rotate-180">mdi-logout</v-icon>
                  </v-btn>
                </v-list-item>
              </v-list>
            </template>
          </DropMenue>
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
const defUser = {
  birthdate: null,
  id: null,
  lastname: null,
  name: null,
  national_code: null,
  password: null,
  phone: null,
  role: 0,
}
const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : defUser
import { useGlobalStore } from '@/stores/global.js'
const menuStore = useGlobalStore()
const togglemenuBtn = () => {
  if (menuStore.isMenuOpen == true) {
    menuStore.closeMenu()
  } else {
    menuStore.openMenu()
  }
}
const goToProfile = () => {
  router.push('/profile')
}
const logOutFunction = () => {
  menuStore.logOut(router)
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
