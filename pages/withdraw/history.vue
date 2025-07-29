<template>
  <div>
    <div v-if="isLoadingHistory" class="text-center py-10">Загрузка транзакций...</div>
    <div v-else-if="transactions.length > 0" class="space-y-4 mt-6">
      <div v-for="tx in transactions" :key="tx.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <div>
          <p class="font-bold text-primary-text dark:text-white">Вывод на карту {{ tx.card_number }}</p>
          <p class="text-sm text-secondary-text dark:text-gray-400 mt-1">{{ tx.date }}</p>
        </div>
        <span class="font-semibold text-red-500">
          - {{ tx.amount }}
        </span>
      </div>
    </div>
    <div v-else class="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
      История транзакций пуста.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWithdrawalStore } from '~/store/withdrawal';

const withdrawalStore = useWithdrawalStore();
const { transactions, isLoadingHistory } = storeToRefs(withdrawalStore);
const { fetchTransactions } = withdrawalStore;

onMounted(() => {
  if (transactions.value.length === 0) {
    fetchTransactions();
  }
});
</script>