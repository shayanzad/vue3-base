<template>
  <div class="p-2">
    <nav class="flex justify-between items-center">
      <div>
        <v-btn @click="togglemenuBtn" class="mr-2" variant="text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            class="iconify iconify--solar"
          >
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
              <path d="M20 7H4"></path>
              <path d="M20 12H4" opacity=".5"></path>
              <path d="M20 17H4"></path>
            </g>
          </svg>
        </v-btn>
        <!-- <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/about" class="mx-2">About</RouterLink> -->
        <!-- <RouterLink to="/auth/login" class="mx-2">login</RouterLink> -->
      </div>
      <div>
        <div class="text-center flex">
          <!-- <DropMenue title="پروفایل کاربر" count="10" icon="bell-ring-outline" />
          <DropMenue title="صندوق ورودی" count="25" icon="inbox-arrow-down" /> -->
          <DropMenue title="پروفایل کاربر" count="25" icon="account">
            <template #content>
              <v-list>
                <v-list-item>
                  <div class="flex">
                    <div class="bg-primary-200 rounded-full w-fit p-1 shadowLight">
                      <v-icon size="80" class="text-secondary-200">mdi-account</v-icon>
                    </div>
                    <div class="flex flex-col justify-center px-4">
                      <span style="font-size: 18px; font-weight: 600">{{
                        userData.name + ' ' + userData.lastname
                      }}</span>
                      <span class="text-gray-400">{{ menuStore.getRoleText() }}</span>
                      <span class="text-gray-600">4190513571</span>
                    </div>
                  </div>
                  <v-divider :thickness="3" class="border-opacity-75 mt-4" color="info"></v-divider>
                </v-list-item>
                <!-- <v-list-item
                  prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                  :subtitle="menuStore.getRoleText()"
                  :title="userData.name + ' ' + userData.lastname"
                  @click="goToProfile"
                  size="24"
                >

                </v-list-item> -->
                <!-- <v-list-item>
                  <template v-slot:append>
                    <v-btn @click="goToProfile" class="w-full"> حساب کاربری</v-btn>
                  </template>
                </v-list-item> -->
                <v-list-item class="mt-4">
                  <v-btn
                    @click="goToProfile"
                    block
                    variant="outlined"
                    color="info"
                    class="flex justify-center items-center"
                  >
                    <span class="mx-2">رفتن به حساب کاربری </span>
                  </v-btn>

                  <!-- <v-btn @click="goToProfile" class="w-full"> حساب کاربری</v-btn> -->
                </v-list-item>
                <v-list-item class="m2-4">
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
