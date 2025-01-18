<template>
  <div>
    <tableffff
      :headers="headers"
      :items="items"
      :loading="isLoading"
      showSelect
      v-model="rowSelected"
      @curentPage="getCurrentPage"
      @rowSelected="changeRowSelected"
      title="راننده ها"
      itemValue="id"
      :customSlots="['externalStatus']"
    >
      <template #externalStatus="{ item }">
        <span v-if="item.externalStatus == 1">فعال</span>
        <span v-if="item.externalStatus == 0">غیر فعال</span>
      </template>
      <template #actions>
        <div class="flex">
          <div class="ml-2">
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props" @click="getAgain">
                  <v-icon class="text-secondary-900">mdi-refresh</v-icon></v-btn
                >
              </template>
              <span>بارگزاری مجدد</span>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ایجاد نوبت">
              <template v-slot:activator="{ props }">
                <v-btn @click="openForm('new')" variant="text" v-bind="props">
                  <v-icon class="text-secondary-900">mdi-plus</v-icon></v-btn
                >
              </template>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ویرایش نوبت">
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="text-primary cursor-pointer iconify iconify--solar"
                    size="small"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                      <path
                        d="M2 12c0 4.714 0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12v-1.5M13.5 2H12C7.286 2 4.929 2 3.464 3.464c-.973.974-1.3 2.343-1.409 4.536"
                      ></path>
                      <path
                        d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-2.983 2.982m-2.982 2.983c-.404.404-.606.606-.829.78a4.6 4.6 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"
                      ></path>
                    </g>
                  </svg>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="   حذف">
              <template v-slot:activator="{ props }">
                <v-btn @click="deleteItem" variant="text" v-bind="props">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    class="text-error cursor-pointer iconify iconify--solar"
                    size="small"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79s-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
                    ></path>
                  </svg>
                </v-btn>
              </template>
            </v-tooltip>
          </div>
        </div>
      </template>
      <!-- <template #header>
        <div class="flex">
          <router-link to="/panel/factory/orders/addNew"
            ><v-btn>
              <v-icon>mdi-plus </v-icon>
              <span>افزودن</span>
            </v-btn></router-link
          >
          <MainFullFilter class="mr-2" />

          <v-btn class="flex items-center justify-center mr-2">
            <v-icon>mdi-file-export</v-icon>
            <span>خروجی</span>
          </v-btn>
        </div>
      </template> -->
      <!-- <template #rent="{ item }">
        <span> {{ $seprate(item.rent) }}</span>
      </template>
      <template #created_at="{ item }">
        <span> {{ $convertDateOnly(item.created_at) }}</span>
      </template>
      <template #timeIssue="{ item }">
        <span> {{ $convertDateOnly(item.timeIssue) }}</span>
      </template> -->
    </tableffff>
  </div>
  <v-dialog v-model="showForm" max-width="800" class="rounded-2xl">
    <v-card class="!rounded-xl">
      <div class="py-10 px-10">
        <h1 class="mb-10 dialogTitle">ایجاد ایستگاه</h1>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formModel.title"
              label=" عنوان *"
              density="comfortable"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formModel.managerName"
              label="نام مدیر *"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="formModel.managerNationalCode"
              label="  کد ملی مدیر *"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="formModel.province_id"
              label="  استان *"
              :items="provinceList"
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="formModel.city_id"
              label="شهر *"
              disabled
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-autocomplete
              label="  نام خط *"
              :items="provinceList"
              v-model="formModel.line_id"
              variant="outlined"
              density="comfortable"
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="12">
            <div v-for="(item, index) in formModel.line_id" :key="index">
              {{ item }}
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <mapCompnent height="300" @address="jjjjjj" />
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              label="آدرس*"
              v-model="formModel.address"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="flex justify-end mt-10">
          <v-btn variant="tonal" color="red" class="rounded-full mx-2" @click="close">انصراف</v-btn>
          <v-btn variant="tonal" color="success" class="rounded-full px-4">ثبت</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import tableffff from '@/components/base/table.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
import apiServices from '@/server/apiServices'

import mapCompnent from '../../components/base/map.vue'
const toast = useToast()
const isLoading = ref(false)
const showForm = ref(false)
const rowSelected = ref([])
const formModel = ref({
  id: null,
  title: null,
  managerName: null,
  managerNationalCode: null,
  province_id: 'خراسان رضوی',
  city_id: 'مشهد',
  address: 'مشهد',
  line_id: null,
})
const jjjjjj = (mapData) => {
  console.log(mapData.addressText)
  formModel.value.address = mapData.addressText
}
const openForm = (type) => {
  toast.info('ایجاد نوبت درحال توسعه میباشد')

  // console.log(type)
  // showForm.value = true
}
const getAgain = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}
const close = () => {
  showForm.value = false
}
const provinceList = ref([])
const getProvince = () => {
  apiServices
    .Get('/v1/get_provinces')
    .then((res) => {
      console.log(res)
      provinceList.value = res.data
    })
    .catch(() => {})
}
const deleteItem = () => {
  showConfirmation()
}
const showConfirmation = async () => {
  const result = await Swal.fire({
    title: 'آیا از حذف نوبت مطمئن هستید؟',
    text: 'این عملیات قابل بازگشت نیست!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'بله، انجام بده',
    cancelButtonText: 'لغو',
  })

  if (result.isConfirmed) {
    Swal.fire({
      title: 'انجام شد!',
      text: 'عملیات با موفقیت انجام شد.',
      icon: 'success',
      confirmButtonText: 'متوجه شدم',
    })
  } else {
    Swal.fire({
      title: 'لغو شد!',
      text: 'عملیات لغو شد.',
      icon: 'error',
      confirmButtonText: 'متوجه شدم',
    })
  }
}

const headers = [
  {
    title: 'نام',
    align: 'start',
    filterable: true,
    value: 'name',
    status: true,
  },
  { title: 'فامیل', value: 'family', status: true },
  { title: 'کد ملی', value: 'nationalId', status: true },
  { title: 'موبایل', value: 'mobile', status: true },
  { title: 'وضعیت راهداری', value: 'externalStatus', status: true },
  // { title: 'تاریخ ثبت نام', value: 'created_at', status: true },
  // { title: 'امتیاز', value: 'score', status: true },
  // { title: 'احراز هویت', value: 'verifyMobile', status: true },
]
const items = [
  {
    id: 3129,
    user_id: 3832,
    mobile: '09355221019',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-17T20:27:43.000000Z',
    name: 'يوسف علي',
    family: 'باغ جري',
    fatherName: 'صفر علي',
    nationalId: '0079444776',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1987-05-19',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3128,
    user_id: 3831,
    mobile: '09172782210',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-17T12:01:22.000000Z',
    name: 'مرتضي',
    family: 'فلاح مهرآبادي',
    fatherName: 'نصراله',
    nationalId: '5039983931',
    active_car_id: '3527',
    externalStatus: 1,
    birthDate: '1987-03-22',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3127,
    user_id: 3830,
    mobile: '09151732821',
    wallet: '832000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-17T06:43:24.000000Z',
    name: 'رجبعلي',
    family: 'اله آبادي',
    fatherName: 'عباس',
    nationalId: '5739409731',
    active_car_id: '3523',
    externalStatus: 1,
    birthDate: '1964-09-16',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3126,
    user_id: 3829,
    mobile: '09153610072',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-16T17:42:36.000000Z',
    name: 'محمد',
    family: 'رمضاني',
    fatherName: 'اسدالله',
    nationalId: '0652875645',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1975-08-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3125,
    user_id: 3827,
    mobile: '09019067634',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-15T18:20:43.000000Z',
    name: 'امين',
    family: 'برزوئي',
    fatherName: 'محمدابراهيم',
    nationalId: '0790657732',
    active_car_id: '3521',
    externalStatus: 1,
    birthDate: '1978-06-22',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3124,
    user_id: 3826,
    mobile: '09159745003',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-15T12:23:15.000000Z',
    name: 'هادي',
    family: 'حجتي نسب',
    fatherName: 'پيرعلي',
    nationalId: '5739902231',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1984-12-06',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3123,
    user_id: 3825,
    mobile: '09159743565',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-15T07:41:22.000000Z',
    name: 'علي اكبر',
    family: 'شكرالهي',
    fatherName: 'حسين',
    nationalId: '5739985218',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1986-08-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3122,
    user_id: 3824,
    mobile: '09139836830',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-15T06:34:29.000000Z',
    name: 'امير',
    family: 'صانعي دهكردي',
    fatherName: 'ولي اله',
    nationalId: '4623346994',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1986-08-06',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3121,
    user_id: 3823,
    mobile: '09158778246',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-14T17:43:28.000000Z',
    name: 'موسي الرضا',
    family: 'حيدري',
    fatherName: 'عباس',
    nationalId: '5749954757',
    active_car_id: '3518',
    externalStatus: 1,
    birthDate: '1985-07-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3120,
    user_id: 3822,
    mobile: '09358715222',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-14T14:41:53.000000Z',
    name: 'حسين',
    family: 'فسنقري',
    fatherName: 'فتح الله',
    nationalId: '0794688454',
    active_car_id: '3517',
    externalStatus: 1,
    birthDate: '1976-04-10',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3119,
    user_id: 3821,
    mobile: '09133211621',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-14T13:50:32.000000Z',
    name: 'سيروس',
    family: 'نامدار',
    fatherName: 'سعيد',
    nationalId: '1199926299',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1989-03-03',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3118,
    user_id: 3820,
    mobile: '09162355740',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-14T08:57:08.000000Z',
    name: 'علي',
    family: 'حاج هاشمي',
    fatherName: 'محمود',
    nationalId: '1141055244',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1972-03-02',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3117,
    user_id: 3819,
    mobile: '09141567092',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-14T06:34:56.000000Z',
    name: 'موسي الرضا',
    family: 'حافظي كلخوران',
    fatherName: 'سيف اله',
    nationalId: '1461295599',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1970-08-24',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3116,
    user_id: 3818,
    mobile: '09144204630',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-13T17:58:27.000000Z',
    name: 'صابر',
    family: 'احدي',
    fatherName: 'يعقوب',
    nationalId: '1602153620',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1973-03-29',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3115,
    user_id: 3817,
    mobile: '09308328793',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-13T09:54:20.000000Z',
    name: 'سيد منصور',
    family: 'حياتي',
    fatherName: 'سيدمحسن',
    nationalId: '0370424824',
    active_car_id: '3510',
    externalStatus: 1,
    birthDate: '1991-02-20',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3114,
    user_id: 3814,
    mobile: '09184797375',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-11T13:58:42.000000Z',
    name: 'امير',
    family: 'ميرزائي',
    fatherName: 'علي اكبر',
    nationalId: '3341455531',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1984-05-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3113,
    user_id: 3813,
    mobile: '09157143601',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-10T18:18:54.000000Z',
    name: 'حسنعلي',
    family: 'ابوچناري',
    fatherName: 'جعفر علي',
    nationalId: '5219856091',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1984-06-04',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3112,
    user_id: 3812,
    mobile: '09111375295',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-10T10:50:04.000000Z',
    name: 'عباس',
    family: 'گليني',
    fatherName: 'مختار',
    nationalId: '2200537743',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1985-01-25',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3111,
    user_id: 3811,
    mobile: '09155726217',
    wallet: '600000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-10T07:34:28.000000Z',
    name: 'مهدي',
    family: 'زمندي',
    fatherName: 'قربانعلي',
    nationalId: '5219887874',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1984-03-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3110,
    user_id: 3810,
    mobile: '09143173019',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-09T09:40:53.000000Z',
    name: 'اكبر',
    family: 'خضوعي',
    fatherName: 'حسن',
    nationalId: '1380999154',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1983-05-16',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3109,
    user_id: 3809,
    mobile: '09157428186',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-09T09:35:57.000000Z',
    name: 'حسن',
    family: 'افچنگي',
    fatherName: 'اسماعيل',
    nationalId: '0790570912',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1972-04-11',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3108,
    user_id: 3808,
    mobile: '09153628445',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-09T09:34:40.000000Z',
    name: 'حسين',
    family: 'ظفري',
    fatherName: 'محمد',
    nationalId: '0889335184',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1973-04-30',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3107,
    user_id: 3807,
    mobile: '09153310822',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-08T15:57:30.000000Z',
    name: 'جواد',
    family: 'دوگي',
    fatherName: 'حسين',
    nationalId: '5729769504',
    active_car_id: '3504',
    externalStatus: 1,
    birthDate: '1982-08-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: 'https://quizzical-burnell-yjizuhmqn.storage.iran.liara.space/drivers/profileImage/3107/1736505178profile_image.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ctlvib5993n54ebc%2F20250118%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250118T064638Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1200&X-Amz-Signature=485e01a61a8fd0c6caa3cde813292ea16d9823fdfba0042d116496fe6f3e0635',
  },
  {
    id: 3106,
    user_id: 3806,
    mobile: '09152202558',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-08T09:51:19.000000Z',
    name: 'محمد',
    family: 'بلقان آبادي',
    fatherName: 'محمدحسن',
    nationalId: '0790410583',
    active_car_id: '3501',
    externalStatus: 1,
    birthDate: '1976-01-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3105,
    user_id: 3805,
    mobile: '09127605045',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-08T06:08:29.000000Z',
    name: 'مهدي',
    family: 'كيوانلو شهرستانكي',
    fatherName: 'رضا',
    nationalId: '5219663641',
    active_car_id: '3498',
    externalStatus: 1,
    birthDate: '1977-08-29',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3104,
    user_id: 3804,
    mobile: '09149825997',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-08T05:46:06.000000Z',
    name: 'وحيد',
    family: 'عبدالهي',
    fatherName: 'عيوض',
    nationalId: '2960492943',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1998-11-27',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3103,
    user_id: 3803,
    mobile: '09158881260',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-07T15:47:56.000000Z',
    name: 'سجاد',
    family: 'آذرگون',
    fatherName: 'غلامرضا',
    nationalId: '0820244740',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1994-06-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3102,
    user_id: 3801,
    mobile: '09105100417',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-07T09:25:04.000000Z',
    name: 'براتعلي',
    family: 'جلمباداني',
    fatherName: 'حسن',
    nationalId: '5739347386',
    active_car_id: '3494',
    externalStatus: 1,
    birthDate: '1977-03-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3101,
    user_id: 3798,
    mobile: '09384151013',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-06T14:26:08.000000Z',
    name: 'سهراب',
    family: 'شهدادنژاد',
    fatherName: 'حسن',
    nationalId: '3020197007',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1991-09-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3100,
    user_id: 3796,
    mobile: '09159708923',
    wallet: '150000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-05T18:17:53.000000Z',
    name: 'حسين',
    family: 'كلاته آقامحمدي',
    fatherName: 'رضا',
    nationalId: '5739977037',
    active_car_id: '3489',
    externalStatus: 1,
    birthDate: '1987-07-06',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3099,
    user_id: 3795,
    mobile: '09124217440',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-05T15:48:13.000000Z',
    name: 'مسلم',
    family: 'ترابي',
    fatherName: 'محمد',
    nationalId: '0795265646',
    active_car_id: '3486',
    externalStatus: 1,
    birthDate: '1987-09-10',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3098,
    user_id: 3794,
    mobile: '09335343147',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-05T08:13:53.000000Z',
    name: 'عباس',
    family: 'ملكي',
    fatherName: 'نبي',
    nationalId: '0750008857',
    active_car_id: '3481',
    externalStatus: 1,
    birthDate: '1990-03-04',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3097,
    user_id: 3793,
    mobile: '09385745820',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-05T07:54:48.000000Z',
    name: 'حسين',
    family: 'پوردهقانيان',
    fatherName: 'علي جان',
    nationalId: '5740055555',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1994-08-29',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3096,
    user_id: 3792,
    mobile: '09158080639',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-04T19:29:17.000000Z',
    name: 'علي اكبر',
    family: 'حسين آبادي',
    fatherName: 'علي محمد',
    nationalId: '5739376262',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1971-03-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3095,
    user_id: 3791,
    mobile: '09397232620',
    wallet: '350000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-04T18:07:33.000000Z',
    name: 'حميد',
    family: 'كلاته عربي',
    fatherName: 'صفرعلي',
    nationalId: '0639565638',
    active_car_id: '3484',
    externalStatus: 1,
    birthDate: '1984-04-04',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3094,
    user_id: 3790,
    mobile: '09389345900',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-04T17:47:48.000000Z',
    name: 'علي اصغر',
    family: 'طاهريان',
    fatherName: 'محمدعلي',
    nationalId: '1060680114',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1969-08-27',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3093,
    user_id: 3789,
    mobile: '09362592916',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-04T10:13:10.000000Z',
    name: 'ابوالفضل',
    family: 'شمس ابادي',
    fatherName: 'كاظم',
    nationalId: '0795044011',
    active_car_id: '3479',
    externalStatus: 1,
    birthDate: '1988-09-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3092,
    user_id: 3788,
    mobile: '09159712807',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-03T20:21:07.000000Z',
    name: 'محسن',
    family: 'يوسفي مقدم',
    fatherName: 'علي اصغر',
    nationalId: '0793557151',
    active_car_id: '3477',
    externalStatus: 1,
    birthDate: '1980-01-19',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3091,
    user_id: 3787,
    mobile: '09153527794',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-03T13:27:04.000000Z',
    name: 'محمد',
    family: 'مقصودي',
    fatherName: 'حسين',
    nationalId: '6339870600',
    active_car_id: '3476',
    externalStatus: 1,
    birthDate: '1976-04-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3090,
    user_id: 3786,
    mobile: '09166642940',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-02T12:39:40.000000Z',
    name: 'ميثم',
    family: 'بلگي وند',
    fatherName: 'محمد',
    nationalId: '4840032629',
    active_car_id: null,
    externalStatus: 0,
    birthDate: '1991-03-04',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3089,
    user_id: 3785,
    mobile: '09367265944',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-02T09:53:35.000000Z',
    name: 'يونس',
    family: 'كمايستاني',
    fatherName: 'عزيزاله',
    nationalId: '0946486646',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1985-07-12',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3088,
    user_id: 3783,
    mobile: '09151736905',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2025-01-02T06:23:01.000000Z',
    name: 'سيدعلي',
    family: 'علوي زارع',
    fatherName: 'سيديوسف',
    nationalId: '2121368957',
    active_car_id: '3468',
    externalStatus: 1,
    birthDate: '1966-04-09',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3087,
    user_id: 3782,
    mobile: '09352847259',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-31T23:02:13.000000Z',
    name: 'محمد',
    family: 'اكبرآبادي',
    fatherName: 'محمدعلي',
    nationalId: '1062906071',
    active_car_id: '3465',
    externalStatus: 1,
    birthDate: '1983-09-20',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3086,
    user_id: 3781,
    mobile: '09388787011',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-31T15:36:33.000000Z',
    name: 'محسن',
    family: 'شمس آبادي',
    fatherName: 'اسماعيل',
    nationalId: '0780652002',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1996-05-01',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3085,
    user_id: 3780,
    mobile: '09151734354',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-31T13:12:02.000000Z',
    name: 'رمضانعلي',
    family: 'باغجري',
    fatherName: 'حسين خان',
    nationalId: '0793851939',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1982-06-25',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3084,
    user_id: 3778,
    mobile: '09159718076',
    wallet: '135000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-30T19:50:53.000000Z',
    name: 'مجتبي',
    family: 'بيدخوري',
    fatherName: 'محمد',
    nationalId: '5739936713',
    active_car_id: '3459',
    externalStatus: 1,
    birthDate: '1985-05-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3083,
    user_id: 3777,
    mobile: '09159303766',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-30T15:36:43.000000Z',
    name: 'مهدي',
    family: 'خاكشور',
    fatherName: 'محمد',
    nationalId: '0700470069',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1977-06-22',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3082,
    user_id: 3776,
    mobile: '09155714167',
    wallet: '150000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-30T11:18:03.000000Z',
    name: 'ناصر',
    family: 'بيدخوري',
    fatherName: 'عبداله',
    nationalId: '5739291712',
    active_car_id: '3453',
    externalStatus: 1,
    birthDate: '1977-09-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3081,
    user_id: 3775,
    mobile: '09016832196',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-30T07:42:07.000000Z',
    name: 'مصيب',
    family: 'حسين آبادي',
    fatherName: 'علي محمد',
    nationalId: '5739377544',
    active_car_id: null,
    externalStatus: 1,
    birthDate: '1978-09-23',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
  {
    id: 3080,
    user_id: 3774,
    mobile: '09050861168',
    wallet: '100000.0000',
    status: 1,
    twoFactorEnabled: 0,
    created_at: '2024-12-29T21:38:13.000000Z',
    name: 'حسين',
    family: 'فشانجردي',
    fatherName: 'علي اكبر',
    nationalId: '5219661345',
    active_car_id: null,
    externalStatus: 0,
    birthDate: '1973-03-21',
    terminal_id: null,
    terminal: null,
    score: '5.00',
    verifyMobile: 1,
    path: '',
  },
]

const getCurrentPage = (val) => {
  // page.value = val
  // getOrderList()
}
const changeRowSelected = (val) => {
  rowSelected.value = []

  rowSelected.value = val
}
onMounted(() => {
  getProvince()
})
</script>
<style scoped>
.v-data-table {
  /* border-radius: 15px !important; */
  box-shadow: 0 1px 4px #8592ad33 !important;
}
.v-input--is-focused .v-input__slot {
  border: 2px solid #005fcc !important;
  border-bottom-color: rgba(0, 0, 0, 0.38) !important;
}
</style>
