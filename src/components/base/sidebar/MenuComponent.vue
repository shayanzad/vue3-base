<template>
  <ul>
    <MenuItemComponent v-for="item in props.menuItem" :key="item.title" :item="item" />
  </ul>
</template>

<script setup>
import MenuItemComponent from './MenuItemComponent.vue'
const props = defineProps(['menuItem'])
</script>

<style scoped></style>
