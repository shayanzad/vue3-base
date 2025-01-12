<template>
  <div dir="rtl">
    <v-row class="m-0 p-0">
      <v-col class="!p-0 m-0 relative overflow-hidden invisible md:visible">
        <div class="circle-top"></div>
        <img
          width="150px"
          class="mx-2 z-50 absolute right-10 bottom-3 opacity-50"
          src="../../assets/images/taxi-svg.svg"
        />

        <div class="flex justify-center items-center h-[100vh] text-white bg-secondary-900">
          <div class="flex z-50">
            <div>
              <h1 class="text-lg md:text-4xl z-10" style="line-height: 50px">
                به سفرگرام خوش آمدید
              </h1>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="!p-0 m-0">
        <div class="flex border justify-center items-center h-[100vh]">
          <v-form @submit.prevent="onSubmit" class="w-[350px]" ref="loginForm">
            <v-row>
              <v-col><div class="text-primary-900 text-lg">ورود به سامانه</div> </v-col>
              <v-col cols="12">
                <span class="mb-4" style="font-weight: 500"> نام کاربری </span>
                <v-text-field
                  class="w-full mt-2"
                  variant="outlined"
                  required
                  :rules="[required]"
                  clearable
                  v-modle="formModel.userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <span class="mb-4" style="font-weight: 500"> کلمه عبور </span>
                <v-text-field
                  class="w-full mt-2"
                  variant="outlined"
                  required
                  :rules="[required]"
                  clearable
                  v-modle="formModel.password"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">رمز عبور خود را فراموش کرده اید ؟</span>
                  <v-btn variant="text" class="text-gray-800 text-sm">فراموشی رمز عبور</v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn type="submit" block class="rounded-lg bg-secondary-900 text-withe"
                  >ورود</v-btn
                >
              </v-col>
              <v-col cols="12" class="p-0 m-0">
                <div class="flex justify-center items-center">
                  <span class="text-gray-500 text-sm"> حساب کاربری ندارید ؟</span>
                  <v-btn variant="text" class="text-secondary-500 text-sm">ایجاد حساب کاربری</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { rulseForm } from '@/utils/rulesForm'
import { ref } from 'vue'
import apiServices from '@/server/apiServices'
const { required } = rulseForm()
const loginForm = ref()
const formModel = ref({
  userName: null,
  password: null,
})

const onSubmit = () => {
  if (!loginForm.value?.isValid) return

  apiServices.Post('/login', formModel.value).then((res) => {
    console.log(res)
  })
}
const succeseLogin = () => {}
</script>
<style scoped>
@media (min-width: 400px) and (max-width: 1100px) {
  .circle-top {
    position: absolute;
    top: -18% !important;
    right: -18% !important;
    border: 55px solid #193d61 !important;
    height: 250px !important;
    width: 250px !important;
    display: block;
    background: 0 0;
    border-radius: 100%;
  }
}

.circle-top {
  position: absolute;
  top: -25%;
  right: -25%;
  border: 120px solid #193d61;
  height: 700px;
  width: 700px;
  display: block;
  background: 0 0;
  border-radius: 100%;
}
</style>
