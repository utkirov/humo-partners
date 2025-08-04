<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="sm:ml-8 lg:ml-0 text-3xl font-bold text-primary-text dark:text-white">Главная</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard v-for="card in statCards" :key="card.title" v-bind="card"/>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 class="font-bold text-lg mb-4">Пользователи</h3>
        <div class="h-80">
          <ChartsLineChart :chart-data="lineChartData"/>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 class="font-bold text-lg mb-4">Пользователи</h3>
        <div class="h-80">
          <ChartsDoughnutChart :chart-data="doughnutChartData"/>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 class="font-bold text-lg mb-4">Общий доход</h3>
      <div class="h-80">
        <ChartsLineChart :chart-data="incomeChartData"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDashboardStore } from '~/store/dashboard';

definePageMeta({layout: 'default'});
useHead({title: 'Главная | Humo TV Partners'});

// ✨ 1. Инициализируем хранилище Pinia
const dashboardStore = useDashboardStore();
const { stats, isLoading } = storeToRefs(dashboardStore);
const { fetchDashboardStats } = dashboardStore;

// ✨ 2. Создаем computed-свойство для трансформации данных из API в нужный формат
const statCards = computed(() => {
  if (isLoading.value) {
    // Возвращаем "скелет" данных на время загрузки
    return [
      {icon: 'ph:users', title: 'Зарегистрированные', value: '...', percentage: 0, color: 'text-blue-500'},
      {icon: 'ph:money', title: 'Общий доход', value: '...', percentage: 0, color: 'text-green-500'},
      {icon: 'ph:arrow-fat-lines-up', title: 'Общие выплаты', value: '...', percentage: 0, color: 'text-orange-500'},
    ];
  }
  return [
    {
      icon: 'ph:users',
      title: 'Зарегистрированные',
      value: stats.value.registers.toLocaleString('fr-FR'),
      percentage: 23, // Эти данные пока статичны, т.к. API их не предоставляет
      color: 'text-blue-500'
    },
    {
      icon: 'ph:money',
      title: 'Общий доход',
      value: stats.value.total_income.toLocaleString('fr-FR'),
      percentage: -13,
      color: 'text-green-500'
    },
    {
      icon: 'ph:arrow-fat-lines-up',
      title: 'Общие выплаты',
      value: stats.value.total_payout.toLocaleString('fr-FR'),
      percentage: 26,
      color: 'text-orange-500'
    },
  ];
});


// ✨ 3. Загружаем данные при монтировании страницы
onMounted(() => {
  fetchDashboardStats();
});


// --- Данные для графиков остаются статичными ---

const lineChartData = ref({
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
  datasets: [
    {
      label: 'Зарегистрированные',
      backgroundColor: '#3b82f6',
      borderColor: '#3b82f6',
      data: [120, 150, 180, 160, 200, 190],
      tension: 0.4,
    },
    {
      label: 'Активные',
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
      data: [80, 90, 110, 100, 130, 120],
      tension: 0.4,
    },
  ],
});

const doughnutChartData = ref({
  labels: ['Активные пользователи', 'Неактивные'],
  datasets: [
    {
      backgroundColor: ['#3b82f6', '#eab308'],
      data: [63, 25]
    }
  ]
});

const incomeChartData = ref({
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
  datasets: [
    {
      label: 'Доход',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      data: [500000, 600000, 550000, 700000, 680000, 750000],
      tension: 0.4,
    }
  ]
});
</script>