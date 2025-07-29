<template>
  <div>
    <div v-if="isLoadingHistory" class="text-center py-10">
      <p class="text-secondary-text dark:text-gray-400">Загрузка заявок...</p>
    </div>

    <div v-else-if="tickets.length > 0" class="space-y-4 mt-6">
      <div v-for="ticket in tickets" :key="ticket.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <div>
          <p class="font-bold text-primary-text dark:text-white">{{ ticket.amount.toLocaleString('fr-FR') }} UZS</p>
          <p class="text-sm text-secondary-text dark:text-gray-400 mt-1">{{ ticket.date }}</p>
        </div>
        <span
            class="font-semibold px-3 py-1 text-xs rounded-full"
            :class="getStatusClass(ticket.status)"
        >
          {{ getStatusText(ticket.status) }}
        </span>
      </div>
    </div>

    <div v-else class="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
      <p class="text-secondary-text dark:text-gray-400">История заявок на вывод пуста.</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useWithdrawalStore} from '~/store/withdrawal';

// Инициализация хранилища Pinia
const withdrawalStore = useWithdrawalStore();

// Получаем состояние и действия из хранилища
const {tickets, isLoadingHistory} = storeToRefs(withdrawalStore);
const {fetchTickets} = withdrawalStore;

// ✨ Обновлено: статусы соответствуют ответу API ('success', 'open')
const getStatusText = (status) => {
  const statuses = {
    'open': 'В обработке',
    'success': 'Выполнена',
    'rejected': 'Отклонена'
  };
  return statuses[status] || status;
};

const getStatusClass = (status) => {
  const classes = {
    'open': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'success': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

// Загружаем данные при монтировании страницы
onMounted(() => {
  if (tickets.value.length === 0) {
    fetchTickets();
  }
});
</script>