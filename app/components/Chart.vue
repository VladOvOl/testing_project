<template>
    <ClientOnly>
        <div style="height: 300px; width: 500px;">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHistoryStore } from '~/store/history.store'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const history = useHistoryStore();

const chartData = computed(() => ({
    labels: history.store.map((item,index) => index++), 
    datasets: [
        {
          label: 'Balance',
          data: history.store.map(item => item.balance), 
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3
        }
    ]
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Balance vs Count'
    }
  }
};
</script>