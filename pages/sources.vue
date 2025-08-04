<template>
  <div>
    <h1 class="sm:ml-8 lg:ml-0 text-3xl font-bold text-primary-text mb-8">Источники</h1>
    <AppTabs :tabs="sourceTabs" />
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });

const sourceTabs = [
  { name: 'Мои источники', path: '/sources' },
  { name: 'Добавить источник', path: '/sources/add' },
  { name: 'Мои заявки', path: '/sources/requests' },
];
</script>