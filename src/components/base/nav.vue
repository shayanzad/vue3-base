<template>
  <div class="bg-slate-200 p-2">
    <nav>
      <v-btn class="mr-2" icon="mdi-menu"></v-btn>
      <RouterLink to="/" class="mx-2">Home</RouterLink>
      <RouterLink to="/about" class="mx-2">About</RouterLink>
      <RouterLink to="/auth/login" class="mx-2">login</RouterLink>
    </nav>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
