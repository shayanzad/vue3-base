<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navComponent from '@/components/base/nav.vue'
</script>
<template>
  <div>
    <div class="flex w-full">
      <div>
        <div class="flex bg-slate-50 h-[90vh]">
          <ul class="w-full p-12">
            <li v-for="i in 10" :key="i" class="flex hover:bg-slate-100 p-3 cursor-pointer">
              <span class="w-full"> منو </span>
              <span class="w-full mr-2"> {{ i }} </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full">
        <header>
          <navComponent />
        </header>
        <div class="p-2">
          <RouterView />
        </div>
      </div>
    </div>
    <div>footer</div>
  </div>
</template>
