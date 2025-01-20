<!-- @format -->

<template>
  <div class="rounded-tl-2xl rounded-tr-2xl">
    <!-- <div class="pb-4 flex justify-between items-center border-b-2 border-[rgba(239, 244, 255, 1)]">
      <div>{{ props.title }}</div>
      <slot name="header" />
    </div> -->
    <div class="p-4 mb-2 bg-withe rounded-lg shadowLight">
      <slot name="actions" />
    </div>
    <div class=" ">
      <slot name="filtfers" />
    </div>

    <v-data-table
      v-model:expanded="expanded"
      :return-object="props.returnObject ? true : false"
      v-model="rowSelected"
      :items="props.items"
      select-strategy="single"
      :headers="props.headers.filter((item) => item.state != 'detail')"
      :loading="props.loading"
      no-data-text="موردی برای نمایش وجود ندارد "
      itemsPerPageText="مورد در هر صفحه"
      :show-expand="props.showExpand ? true : false"
      :itemValue="props.itemValue ?? null"
      :show-select="props.showSelect ? true : false"
      class="shadowLight"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template
        v-slot:[`item.${slotName}`]="{ item }"
        v-for="slotName in props.customSlots"
        :key="slotName"
      >
        <slot :name="slotName" :item="item"></slot>
      </template>

      <!-- اسلات برای نمایش زمانی که هیچ داده‌ای وجود ندارد -->
      <template #no-data>
        <div class="flex flex-col justify-center items-center">
          <!-- <img src="../../assets/images/noData.png" class="w-[400px]" /> -->
          <span> موردی برای نمایش وجود ندارد </span>
        </div>
      </template>

      <template v-if="showExpand" v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length" class="bg-blue-50 p-32">
            <v-row class="w-[800px] p-5">
              <v-col
                cols="6"
                v-for="(itemSeleced, index) in ppp"
                :key="index"
                :v-slot="itemSeleced.value"
              >
                <span>
                  {{ itemSeleced.title }}
                </span>
                <span> : </span>
                <span>
                  {{ item[itemSeleced.value] ?? '-------' }}
                </span>
              </v-col>
            </v-row>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- <div v-if="props && props.pageinationData && props.items.length">
      <pagination
        :pageinationData="props.pageinationData"
        :totalCount="props.items?.length"
        :page="1"
        @curentPage="getCurrentPage"
      />
    </div> -->
  </div>
</template>
<script setup>
import { ref, watch, computed, defineProps } from 'vue'
// import { defineProps } from 'vue'
// import pagination from "../main/pagination.vue";
const expanded = ref([])
const emit = defineEmits(['curentPage'])
const rowSelected = ref([])
// import { useTableStore } from '~/stores/table'
// const tableStore = useTableStore()
// const table = computed(() => tableStore.refresh)
watch(
  () => rowSelected.value,
  (val) => {
    console.log(val)

    emit('rowSelected', rowSelected.value)
  },
)
// watch(table, (newValue) => {
//   if (newValue) {
//     rowSelected.value = []
//     // tableStore.setRefreshTable(false)
//   }
// })
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  itemValue: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
  },
  showExpand: {
    type: Boolean,
    required: false,
  },
  returnObject: {
    type: Boolean,
    required: false,
  },

  showSelect: {
    type: Boolean,
    required: false,
  },
  pageinationData: {
    type: Object,
    required: false,
  },
  customSlots: {
    type: Array,
    default: () => [], // نام ستون‌هایی که اسلات داینامیک دارند
  },
})
if (props.showExpand) {
  props.headers.unshift({ title: '', key: 'data-table-expand' })
}
const getCurrentPage = (val) => {
  emit('curentPage', val)
  console.log(val)
}
const ppp = ref(props.headers.filter((item) => item.state == 'detail'))
</script>
<style>
table {
  font-family: IRANSans;
  border-collapse: collapse;
  width: 100%;
}
tr {
  margin: 10px;
}

td,
th {
  padding: 10px !important;
  margin: 30px !important;
}
.v-data-table-header__content {
  span {
    width: max-content;
  }
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */
</style>
