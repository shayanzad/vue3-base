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
      title="ایستگاه ها"
      itemValue="id"
      :customSlots="[
        'operations',
        'company',
        'driverName',
        'created_at',
        'timeIssue',
        'rent',
        'status',
        'paymentStatus',
        'source_city',
        'destination_city',
      ]"
    >
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
            <v-tooltip location="bottom" text="ایجاد ایستگاه">
              <template v-slot:activator="{ props }">
                <v-btn @click="openForm('new')" variant="text" v-bind="props">
                  <v-icon class="text-secondary-900">mdi-plus</v-icon></v-btn
                >
              </template>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ویرایش ایستگاه">
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
            <v-text-field
              v-model="formModel.province_id"
              label="  استان *"
              disabled
              variant="outlined"
              density="comfortable"
            ></v-text-field>
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
          <v-col cols="12" md="4">
            <v-text-field
              label="  نام خط *"
              v-model="formModel.line_id"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
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
import { ref } from 'vue'
import tableffff from '@/components/base/table.vue'
import { useToast } from 'vue-toastification'
import Swal from 'sweetalert2'
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
  console.log(type)
  showForm.value = true
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
const deleteItem = () => {
  showConfirmation()
}
const showConfirmation = async () => {
  const result = await Swal.fire({
    title: 'آیا از حذف ایستگاه مطمئن هستید؟',
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
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },
  // { title: 'نام شرکت', value: 'company.company_name', status: true },

  {
    title: 'عنوان',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'نام مدیر', key: 'calories', align: 'end' },
  { title: 'کد ملی مدیر', key: 'fat', align: 'end' },
  { title: 'استان', key: 'carbs', align: 'end' },
  { title: 'شهر', key: 'protein', align: 'center' },
  { title: 'خطوط', key: 'iron', align: 'end' },
]
const items = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  // ... more items
]

const getCurrentPage = (val) => {
  // page.value = val
  // getOrderList()
}
const changeRowSelected = (val) => {
  rowSelected.value = []

  rowSelected.value = val
}
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
