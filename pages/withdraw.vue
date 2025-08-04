<template>
  <div>
    <h1 class="sm:ml-8 lg:ml-0 text-3xl font-bold text-primary-text dark:text-white mb-8">Вывод на карту</h1>
    <AppTabs :tabs="withdrawTabs" />
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });
const withdrawTabs = [
  { name: 'Вывод средств', path: '/withdraw' },
  { name: 'История транзакций', path: '/withdraw/history' },
  { name: 'Мои заявки', path: '/withdraw/requests' },
];
</script>