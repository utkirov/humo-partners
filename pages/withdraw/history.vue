<template>
  <div class="max-w-2xl">
    <div class="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
      <div v-for="(group, index) in transactionGroups" :key="index">
        <h3 class="font-bold text-primary-text dark:text-gray-200 mb-4">{{ group.date }}</h3>
        <ul class="space-y-4">
          <li v-for="transaction in group.transactions" :key="transaction.id" class="flex items-center gap-4">
            <div
                class="flex items-center justify-center h-12 w-12 rounded-full shrink-0"
                :class="transaction.type === 'payout' ? 'bg-red-100 dark:bg-red-500/20' : 'bg-green-100 dark:bg-green-500/20'"
            >
              <Icon
                  :name="transaction.type === 'payout' ? 'ph:arrow-up-right' : 'ph:arrow-down-left'"
                  class="h-6 w-6"
                  :class="transaction.type === 'payout' ? 'text-red-500' : 'text-green-500'"
              />
            </div>
            <div class="flex-1">
              <p class="font-semibold text-primary-text dark:text-white">{{ transaction.title }}</p>
              <p class="text-sm text-secondary-text dark:text-gray-400">{{ transaction.description }}</p>
            </div>
            <p
                class="font-bold text-lg whitespace-nowrap"
                :class="transaction.type === 'payout' ? 'text-red-500' : 'text-green-500'"
            >
              {{ transaction.amount }}
            </p>
          </li>
        </ul>
      </div>

      <div v-if="!transactionGroups.length" class="text-center py-10">
        <Icon name="ph:list-dashes" class="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
        <p class="mt-4 text-secondary-text dark:text-gray-400">История транзакций пуста.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'История транзакций | Humo TV Partners',
});

// В будущем эти данные будут приходить с API
const transactionGroups = ref([
  {
    date: 'Сегодня',
    transactions: [
      { id: 1, type: 'payout', title: 'Выплаты', description: 'По карте ****44', amount: '-240 000 сум' },
      { id: 2, type: 'deposit', title: 'Пополнение', description: 'По карте ****44', amount: '+50 000 сум' },
      { id: 3, type: 'payout', title: 'Выплаты', description: 'По карте ****21', amount: '-1 200 000 сум' },
    ]
  },
  {
    date: '17 Июля, 2025',
    transactions: [
      { id: 4, type: 'deposit', title: 'Пополнение', description: 'По карте ****88', amount: '+300 000 сум' },
    ]
  }
]);
</script>