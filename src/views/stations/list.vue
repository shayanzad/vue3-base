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
      returnObject
      :customSlots="['lines', 'manager']"
    >
      <template #actions>
        <div class="flex">
          <div class="ml-2">
            <v-tooltip location="bottom">
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props" @click="getStationsList">
                  <v-icon class="text-secondary-900">mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>بارگزاری مجدد</span>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ایجاد ایستگاه">
              <template v-slot:activator="{ props }">
                <v-btn @click="openForm('add')" variant="text" v-bind="props">
                  <v-icon class="text-secondary-900">mdi-plus</v-icon></v-btn
                >
              </template>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ویرایش ایستگاه">
              <template v-slot:activator="{ props }">
                <v-btn variant="text" v-bind="props" @click="openForm('update')">
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
      <template #manager="{ item }">
        <div>
          {{ item.manager?.name + ' ' + item.manager?.lastName }}
        </div>
      </template>
      <template #address="{ item }">
        <div>
          {{ item.station?.name }}
        </div>
      </template>
      <template #lines="{ item }">
        <div class="flex justify-center items-center">
          <span v-for="(itemData, indexData) in item.station.lines" :key="indexData">
            <div class="mx-1 px-4 py-1 rounded-md text-success shadowLight" disabled>
              {{ itemData.name }}
            </div>
          </span>
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
              v-model="formModel.name"
              label=" عنوان *"
              density="comfortable"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="formModel.manager_national_code"
              label=" مدیر *"
              :items="managerList"
              variant="outlined"
              density="comfortable"
              item-title="fullName"
              item-value="national_code"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="formModel.province_id"
              label="  استان *"
              :items="provinceList"
              @update:modelValue="getCityById(formModel.province_id)"
              item-title="title"
              item-value="id"
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="formModel.city_id"
              :items="cityList"
              label="شهر *"
              item-title="title"
              item-value="id"
              variant="outlined"
              density="comfortable"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn @click="addLine" class="" color="info" size="large" variant="tonal" block>
              <v-icon class="ml-2">mdi-plus</v-icon>
              ایجاد خط
            </v-btn>
          </v-col>

          <v-col cols="12" md="12">
            <div v-for="(item, index) in formModel.lines" :key="index">
              <div class="flex items-center mb-2">
                <div class="flex justify-center items-center px-3">{{ index + 1 }}</div>

                <div class="mx-1 w-full">
                  <v-autocomplete
                    hide-details
                    label="  نام خط *"
                    variant="outlined"
                    density="comfortable"
                    :items="lines"
                    v-model="item.name"
                  ></v-autocomplete>
                </div>
                <div class="mx-1 w-full">
                  <v-text-field
                    label=" کد خط"
                    hide-details
                    variant="outlined"
                    density="comfortable"
                    v-model="item.id"
                  ></v-text-field>
                </div>
                <div class="flex justify-center items-center">
                  <v-btn @click="deleteRowLine(index)" variant="text">
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
                </div>
              </div>
              <v-divider :thickness="3" class="border-opacity-75 my-2" color="info"></v-divider>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <mapCompnent
              :type="typeMethod"
              :latlng="[formModel.lat, formModel.lng]"
              height="300"
              @address="jjjjjj"
            />
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
          <v-btn
            variant="tonal"
            :loading="loadingForm"
            @click="saveForm"
            color="success"
            class="rounded-full px-4"
            >ثبت</v-btn
          >
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
const loadingForm = ref(false)
const showForm = ref(false)
const typeMethod = ref('add')
const rowSelected = ref([])
const managerList = ref([])
const line_list = ref([])
const formModel = ref({
  id: null,
  name: null,
  manager_national_code: null,
  province_id: null,
  city_id: null,
  address: '',
  lat: '',
  lng: '',
  lines: [],
})
const lines = ref([
  {
    id: 1,
    title: '  گناباد',
    managerName: null,
  },
  {
    id: 2,
    title: 'تربت حیدریه',
    managerName: null,
  },
  {
    id: 3,
    title: '   تربت جام',
    managerName: null,
  },
  {
    id: 4,
    title: '  نیشابور',
    managerName: null,
  },
])
const jjjjjj = (mapData) => {
  formModel.value.address = mapData.addressText
  formModel.value.lat = mapData.latlng.lat
  formModel.value.lng = mapData.latlng.lng
}
const openForm = (type) => {
  typeMethod.value = type
  if (type == 'add') {
    showForm.value = true
  } else {
    if (rowSelected.value.length > 0) {
      apiServices
        .Post('/v1/get_cities', {
          zone: rowSelected.value[0].station.province.zone.toString().substring(0, 2),
        })
        .then((res) => {
          cityList.value = res.data
          var item = {
            name: rowSelected.value[0].station.name,
            id: rowSelected.value[0].station.id,
            manager_national_code: rowSelected.value[0].manager?.national_code,
            province_id: rowSelected.value[0].station.province?.id,
            city_id: rowSelected.value[0].station.city?.id,
            address: rowSelected.value[0].station.address,
            lat: rowSelected.value[0].station.lat,
            lng: rowSelected.value[0].station.lng,
            lines: rowSelected.value[0].station.lines,
          }
          formModel.value = item
          showForm.value = true
        })
        .catch(() => {})
    } else {
      toast.info('یک مورد را انتخاب کنید')
    }
  }
}
const getAgain = () => {}

const close = () => {
  showForm.value = false
  formModel.value = {
    id: null,
    name: null,
    manager_national_code: null,
    province_id: null,
    city_id: null,
    address: '',
    lat: '',
    lng: '',
    lines: [],
  }
}
const saveForm = () => {
  apiServices
    .Post(`/v1/station/${typeMethod.value}`, formModel.value)
    .then((res) => {
      // items.value = res.data
      isLoading.value = false
      close()
      getStationsList()
      toast.success('ایستگاه با موفقیت ثبت شد.')
    })
    .catch(() => {
      isLoading.value = false
    })
}
const addLine = () => {
  var item = {
    name: null,
    id: null,
  }
  formModel.value.lines.push(item)
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
const cityList = ref([])
const getCityById = (zone) => {
  apiServices
    .Post('/v1/get_cities', { zone: zone.toString().substring(0, 2) })
    .then((res) => {
      cityList.value = res.data
    })
    .catch(() => {})
}
const getStationsList = () => {
  isLoading.value = true
  apiServices
    .Get('/v1/station/get')
    .then((res) => {
      console.log(res)
      items.value = res.data
      setTimeout(() => {
        isLoading.value = false
      }, 1000)
    })
    .catch(() => {
      isLoading.value = false
    })
}
const getManagerList = () => {
  isLoading.value = true
  apiServices
    .Post('/v1/user/get', { role: 1 })
    .then((res) => {
      res.data.forEach((element) => {
        var item = {
          birthdate: element.birthdate,
          id: element.id,
          fullName: element.name + ' ' + element.lastname,
          national_code: element.national_code,
          password: element.password,
          phone: element.phone,
          role: element.role,
        }
        managerList.value.push(item)
      })
    })
    .catch(() => {})
}
const deleteItem = () => {
  showConfirmation()
}
const deleteRowLine = (index) => {
  formModel.value.lines.splice(index, 1)
}
const showConfirmation = async () => {
  if (rowSelected.value.length > 0) {
    const result = await Swal.fire({
      title: 'آیا از حذف ایستگاه مطمئن هستید؟',
      text: 'این عملیات قابل بازگشت نیست!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'بله، انجام بده',
      cancelButtonText: 'لغو',
    })

    if (result.isConfirmed) {
      apiServices
        .Post('/v1/station/delete', { station_id: rowSelected.value[0].station.id })
        .then((res) => {
          console.log(res)
          getStationsList()

          Swal.fire({
            title: 'انجام شد!',
            text: 'عملیات با موفقیت انجام شد.',
            icon: 'success',
            confirmButtonText: 'متوجه شدم',
          })
        })
        .catch(() => {})
    } else {
      Swal.fire({
        title: 'لغو شد!',
        text: 'عملیات لغو شد.',
        icon: 'error',
        confirmButtonText: 'متوجه شدم',
      })
    }
  } else {
    toast.info('یک مورد را انتخاب کنید')
  }
}

const headers = [
  {
    title: 'عنوان',
    align: 'start',
    sortable: false,
    key: 'station.name',
  },
  { title: 'نام مدیر', key: 'manager', align: 'start' },
  { title: 'کد ملی مدیر', key: 'manager.national_code', align: 'start' },
  { title: 'استان', key: 'station.province.title', align: 'start' },
  { title: 'شهر', key: 'station.city.title', align: 'start' },
  { title: 'خطوط', key: 'lines', align: 'center' },
  { title: 'آدرس', key: 'station.address', align: 'start' },
]
const items = ref([])

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
  getStationsList()
  getManagerList()
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
