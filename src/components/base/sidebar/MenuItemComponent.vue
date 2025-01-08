<template>
  <li>
    <RouterLink
      v-if="!props.item.children || props.item.children.length === 0"
      :to="props.item.to ?? ''"
      v-ripple
      :class="{ 'text-secondary-700 bg-primary-200 font-bold': $route.path === props.item.to }"
      class="flex m-1 rounded-full px-4 py-2 ml-5 cursor-pointer hover:!bg-primary-200"
    >
      <VIcon v-if="props.item.icon" :icon="props.item.icon" class="me-2 text-secondary-900" />
      <VIcon v-else icon="mdi-circle-medium" class="me-2" />
      <span class="min-w-[200px] text-secondary-900">{{ props.item.title }}</span>
    </RouterLink>
    <div
      v-else
      @click="handelShowChild"
      v-ripple
      :class="{ 'text-secondary-700 font-bold': $route.path === props.item.to }"
      class="flex m-1 rounded-full hover:bg-slate-100 px-4 py-2 ml-5 cursor-pointer hover:!bg-primary-200"
    >
      <VIcon :icon="props.item.icon" class="me-2 text-secondary-900" />
      <span class="text-secondary-900">{{ props.item.title }}</span>
      <VIcon
        icon="mdi-chevron-left"
        :class="{ rotate: showChild }"
        class="ms-auto text-secondary-900 duration-200"
      />
    </div>
    <ul ref="childBox" class="box-child text-[13px]" :class="showChild ? 'show' : 'hide'">
      <MenuItemComponent v-for="child in props.item.children" :key="child.title" :item="child" />
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps(['item'])
import MenuItemComponent from './MenuItemComponent.vue'
const showChild = ref(false)
const childBox = ref()

const handelShowChild = () => {
  if (!props.item.children || props.item.children.length === 0) return
  showChild.value = !showChild.value
  const h = childBox.value?.scrollHeight
  if (childBox.value) {
    childBox.value.style.height = h + 'px'
  }
}
</script>

<style scoped>
.menu-item {
}

.rotate {
}

.box-child {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
}
.box-child .menu-item {
  @apply pr-7;
}
.hide {
  height: 0 !important;
}

.show {
  margin: 0px 0 !important;
  height: 100%;
}
</style>
../../models
