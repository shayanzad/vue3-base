<template>
  <div>
    <div class="shadowLight rounded-3xl">
      <div class="rounded-3xl">
        <div class="wallpaeper"></div>
      </div>
      <v-row class="px-5 p-10">
        <v-col cols="4" class="">
          <v-icon>mdi-pencil</v-icon>
        </v-col>
        <v-col cols="4" class="mx-auto">
          <div class="relative flex justify-center items-center">
            <div class="flex flex-col justify-center items-center absolute top-[-110px]">
              <div class="rounded-full w-[100px] border-4 border-primary-900 bg-withe p-2">
                <img width="100px" src="../../assets/images/taxi-svg.svg" alt="" />
              </div>
              <span class="mt-3"> {{ userData.name + ' ' + userData.lastname }} </span>
              <span> {{ userData.national_code }} </span>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="mr-auto">
          <div class="flex justify-end">
            <v-btn @click="logOutFunction" class="bg-secondary-700 text-withe rounded-full">
              <span class="mx-2">خروج از حساب کاربری</span>
              <v-icon class="rotate-180">mdi-logout</v-icon>
            </v-btn>
          </div></v-col
        >
      </v-row>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/stores/global.js'
const globalStore = useGlobalStore()
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

import { useRouter } from 'vue-router'
const router = useRouter()

const logOutFunction = () => {
  globalStore.logOut(router)
}
</script>
<style>
.wallpaeper {
  height: 100%;
  min-height: 300px;
  border-radius: 30px 30px 0px 0px;
  width: 100%;
  background-size: cover !important;
  background: url('../../assets/images/profilebg-Cl6pFWxa.jpg');
}
</style>
