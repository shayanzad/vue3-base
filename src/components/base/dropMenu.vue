<template>
  <div>
    <v-menu v-model="showMenu" :close-on-content-click="false" transition="scale-transition">
      <template v-slot:activator="{ props }">
        <!-- <v-btn color="indigo" v-bind="props"> show as Popover </v-btn> -->
        <v-avatar
          v-bind="props"
          size="large"
          @click="toggleShow"
          class="cursor-pointer shadowLight bg-primary-200"
        >
          <v-icon size="30" :icon="`mdi-${propsp.icon ?? 'home'}`"></v-icon>
        </v-avatar>
      </template>

      <v-card min-width="300" class="!rounded-xl">
        <div class="flex justify-between items-center p-4">
          <span style="font-weight: 600">{{ propsp.title ?? null }}</span>
          <span style="font-weight: 600" class="rounded-md bg-yellow-500 px-3 text-white">{{
            propsp.count ?? null
          }}</span>
        </div>
        <div class=" ">
          <slot name="content"></slot>
        </div>

        <!-- <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            subtitle="Founder of Vuetify"
            title="John Leider"
          >
            <template v-slot:append>
              <v-btn :class="fav ? 'text-red' : ''" icon="mdi-heart" variant="text"></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch color="purple" label="Enable messages" hide-details></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch color="purple" label="Enable hints" hide-details></v-switch>
          </v-list-item>
        </v-list> -->

        <!-- <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn variant="text" @click="show = false"> Cancel </v-btn>
                <v-btn color="primary" variant="text" @click="show = false"> Save </v-btn>
              </v-card-actions> -->
      </v-card>
    </v-menu>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const propsp = defineProps(['icon', 'title', 'count'])
const showMenu = ref(false)
const toggleShow = () => {
  showMenu.value = true
}
</script>
