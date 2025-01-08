<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#00004E',
            data: [2, 17, 12],
          },
          {
            label: 'Data Two',
            backgroundColor: '#00004E',
            data: [11, 32, 12],
          },
          {
            label: 'Data Three',
            backgroundColor: '#00004E',
            data: [40, 20, 12],
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    }
  },
}
</script>
