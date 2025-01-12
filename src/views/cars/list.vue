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
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" density="compact" elevation="2">
                  <v-icon class="text-secondary-900">mdi-refresh</v-icon></span
                >
              </template>
              <span>بارگزاری مجدد</span>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="ایجاد ایستگاه">
              <template v-slot:activator="{ props }">
                <span v-bind="props" density="compact" elevation="2">
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
                </span>
              </template>
            </v-tooltip>
          </div>
          <div class="ml-2">
            <v-tooltip location="bottom" text="   حذف">
              <template v-slot:activator="{ props }">
                <span v-bind="props" density="compact" elevation="2">
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
                </span>
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
</template>
<script setup>
import { ref } from 'vue'
import tableffff from '@/components/base/table.vue'
const isLoading = ref(false)
const rowSelected = ref([])
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
</style>
