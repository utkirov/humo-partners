<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-3xl font-bold text-primary-text dark:text-white">Main Dashboard</h1>
      <div class="flex items-center gap-4">
        <input type="text" placeholder="Search..." class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-transparent focus:border-accent-orange outline-none">
        <Icon name="ph:bell" class="h-6 w-6 text-secondary-text dark:text-gray-400" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard v-for="card in statCards" :key="card.title" v-bind="card" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 class="font-bold text-lg mb-4">Пользователи</h3>
        <div class="h-80">
          <ChartsLineChart :chart-data="lineChartData" />
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
        <h3 class="font-bold text-lg mb-4">Пользователи</h3>
        <div class="h-80">
          <ChartsDoughnutChart :chart-data="doughnutChartData" />
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 class="font-bold text-lg mb-4">Общий доход</h3>
      <div class="h-80">
        <ChartsLineChart :chart-data="incomeChartData" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({layout: 'default'});
useHead({title: 'Главная | Humo TV Partners'});

// Данные для карточек статистики
const statCards = ref([
  {icon: 'ph:users', title: 'Зарегистрированные', value: '2500', percentage: 23, color: 'text-blue-500'},
  {icon: 'ph:money', title: 'Общий доход', value: '4 500 000', percentage: -13, color: 'text-green-500'},
  {icon: 'ph:arrow-fat-lines-up', title: 'Общие выплаты', value: '1 200 000', percentage: 23, color: 'text-orange-500'},
]);

// Данные для первого линейного графика
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

// Данные для круговой диаграммы
const doughnutChartData = ref({
  labels: ['Активные пользователи', 'Неактивные'],
  datasets: [
    {
      backgroundColor: ['#3b82f6', '#eab308'],
      data: [63, 25]
    }
  ]
});

// Данные для графика доходов
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