<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-primary-text dark:text-white">Статистика</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h3 class="font-bold text-lg mb-4">Фильтр</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <FormInput v-model="filters.startDate" name="start_date" label="С" type="date" />
        <FormInput v-model="filters.endDate" name="end_date" label="По" type="date" />
        <FormSelect v-model="filters.type" name="type" label="Тип" :options="filterTypes" />
        <div class="flex items-center gap-2">
          <button @click="applyFilters" class="w-full bg-accent-orange text-white font-bold py-2 px-6 rounded-lg">Применить</button>
          <button @click="clearFilters" class="w-full bg-main-bg dark:bg-gray-700 py-2 px-6 rounded-lg">Очистить</button>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h2 class="font-bold text-xl mb-4">Пользователи</h2>
      <div class="h-80">
        <ChartsLineChart v-if="chartData" :chart-data="chartData" />
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
      <h2 class="font-bold text-xl mb-4">История</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b border-border-gray dark:border-gray-700">
          <tr class="text-sm text-secondary-text dark:text-gray-400">
            <th class="p-3 font-semibold">#</th>
            <th class="p-3 font-semibold">UserID</th>
            <th class="p-3 font-semibold">Сумма</th>
            <th class="p-3 font-semibold">Тип</th>
            <th class="p-3 font-semibold">Дата</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in filteredHistoryData" :key="row.id" class="border-b border-border-gray dark:border-gray-700 last:border-b-0">
            <td class="p-3 font-semibold text-primary-text dark:text-white">{{ row.id }}</td>
            <td class="p-3">{{ row.userId }}</td>
            <td class="p-3" :class="row.type === 'payout' ? 'text-red-500' : 'text-green-500'">{{ row.amount }}</td>
            <td class="p-3">{{ row.type === 'payout' ? 'Выплата' : 'Пополнение' }}</td>
            <td class="p-3">{{ row.date }}</td>
          </tr>
          <tr v-if="filteredHistoryData.length === 0">
            <td colspan="5" class="text-center p-8 text-secondary-text">
              Данные по вашему запросу не найдены.
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });
useHead({ title: 'Статистика' });

const toast = useToast();

// --- Данные ---
const filterTypes = ref([
  { value: 'all', label: 'Все пользователи' },
  { value: 'payout', label: 'Выплаты' },
  { value: 'deposit', label: 'Пополнения' },
]);

const allHistoryData = ref([
  { id: '#1245', userId: 'user_abc', amount: '- 150 000 сум', type: 'payout', date: '2025-07-18' },
  { id: '#1244', userId: 'user_def', amount: '+ 25 000 сум', type: 'deposit', date: '2025-07-18' },
  { id: '#1243', userId: 'user_ghi', amount: '- 540 000 сум', type: 'payout', date: '2025-07-17' },
  { id: '#1242', userId: 'user_abc', amount: '+ 1 200 000 сум', type: 'deposit', date: '2025-07-16' },
  { id: '#1241', userId: 'user_jkl', amount: '- 80 000 сум', type: 'payout', date: '2025-07-15' },
]);

const chartData = ref(null);

// --- Логика фильтра ---
const filters = reactive({
  startDate: '',
  endDate: '',
  type: 'all',
});

const appliedFilters = reactive({ ...filters });

const filteredHistoryData = computed(() => {
  return allHistoryData.value.filter(item => {
    const typeMatch = appliedFilters.type === 'all' || item.type === appliedFilters.type;

    // Проверка дат. Если дата не указана, считаем, что она подходит.
    const itemDate = new Date(item.date);
    const startDateMatch = !appliedFilters.startDate || itemDate >= new Date(appliedFilters.startDate);
    const endDateMatch = !appliedFilters.endDate || itemDate <= new Date(appliedFilters.endDate);

    return typeMatch && startDateMatch && endDateMatch;
  });
});

// Функция, которая генерирует данные для графика
const generateChartData = () => {
  // В реальном приложении здесь будет запрос к API с параметрами appliedFilters
  const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Новые пользователи',
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f620',
        data: labels.map(() => Math.floor(Math.random() * 50) + 10),
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Активные пользователи',
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf620',
        data: labels.map(() => Math.floor(Math.random() * 80) + 20),
        tension: 0.4,
        fill: true,
      },
    ]
  }
};

const applyFilters = () => {
  Object.assign(appliedFilters, filters);
  toast.info({ title: 'Фильтр применен', message: 'Данные на странице обновлены.' });
  generateChartData();
};

const clearFilters = () => {
  filters.startDate = '';
  filters.endDate = '';
  filters.type = 'all';
  applyFilters();
};

onMounted(() => {
  generateChartData();
});
</script>