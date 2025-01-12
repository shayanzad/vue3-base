<template>
  <div>
    <div id="map" class="rounded-lg shadowLight" :style="{ height: '500px' }"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  endSelected: {
    type: Boolean,
    required: true,
  },
  startSelected: {
    type: Boolean,
    required: true,
  },
})

import { defineEmits, defineProps, onMounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
const uuu = [
  { title: 'ایستگاه نیشابور', latlang: [36.2132, 58.7943] },
  { title: 'ایستگاه مشهد', latlang: [36.310699, 59.599457] },
  { title: 'ایستگاه فریمان', latlang: [35.4226, 59.512] },
  { title: 'ایستگاه سرخس', latlang: [36.5372, 61.1561] },
]
onMounted(() => {
  const map = L.map('map').setView([36.310699, 59.599457], 8)
  var greenIcon = new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${'blue'}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
  uuu.forEach((item) => {
    L.marker(item.latlang, { icon: greenIcon })
      .addTo(map)

      .bindPopup(`${item.title}`)
      .openPopup()
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://shayantarabar.ir/">shayan tarabar</a>  ',
  }).addTo(map)
})
</script>

<style scoped>
/* @import '~leaflet/dist/leaflet.css'; */
</style>
