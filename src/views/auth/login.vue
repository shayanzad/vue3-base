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
        <div class="flex border justify-center lg:!justify-start items-center h-[100vh]">
          <v-form @submit.prevent="onSubmit" class="ps-lg-12 ps-md-10 w-[460px]" ref="loginForm">
            <v-row>
              <v-col>
                <div class="text-primary-900 text-lg">
                  <img width="40px" class="mx-0" src="../../assets/images/taxi-svg.svg" />
                </div>
                <div class="text-gray-700 text-2xl my-2">صفحه ورود</div>
                <div class="text-primary-900">داشبورد ادمین سفرگرام</div>
              </v-col>
              <v-col cols="12" class="py-0">
                <span class="mb-4" style="font-weight: 500"> نام کاربری </span>
                <v-text-field
                  class="w-full mt-2"
                  variant="outlined"
                  required
                  name="national_code"
                  placeholder="*******0123"
                  :rules="[required]"
                  clearable
                  v-model="formModel.national_code"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <span class="mb-4" style="font-weight: 500"> کلمه عبور </span>
                <v-text-field
                  class="w-full mt-2"
                  variant="outlined"
                  required
                  :rules="[required]"
                  clearable
                  v-model="formModel.password"
                  placeholder="* * * * * * "
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">رمز عبور خود را فراموش کرده اید ؟</span>
                  <v-btn variant="text" class="text-gray-800 text-sm">فراموشی رمز عبور</v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn
                  :loading="loading"
                  type="submit"
                  block
                  class="rounded-lg h-[80px] bg-secondary-900 text-withe"
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
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const { required } = rulseForm()
const loginForm = ref()
const loading = ref(false)
const formModel = ref({
  national_code: null,
  password: null,
})

const onSubmit = () => {
  loading.value = true
  if (!loginForm.value?.isValid) return
  apiServices
    .Post('/v1/auth/login', formModel.value)
    .then((res) => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      succeseLogin(res.data.user)
    })
    .catch(() => {
      loading.value = false
    })
}
const succeseLogin = (user) => {
  loading.value = false
  router.push('/')
  Swal.fire({
    title: 'ورود موفق',
    text: `    ${user.name + ' ' + user.lastname}  خوش آمدید `,
    icon: 'success',
    showConfirmButton: false,
    timer: 2500,
  })
}
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
