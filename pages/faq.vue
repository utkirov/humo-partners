<template>
  <div>
    <h1 class="text-3xl font-bold text-primary-text mb-8">FAQ</h1>
    <AppTabs :tabs="faqTabs" />
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });

const faqTabs = [
  { name: 'Основные', path: '/faq' },
  { name: 'Вывод', path: '/faq/withdrawal' }, // Пример для будущих страниц
  { name: 'Другие', path: '/faq/other' },     // Пример для будущих страниц
];
</script>