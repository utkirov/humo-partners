<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs';

defineProps({
  chartData: { type: Object, required: true },
  chartOptions: {
    type: Object,
    default: () => ({ responsive: true, maintainAspectRatio: false })
  }
});
</script>