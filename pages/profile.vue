<template>
  <div>
    <h1 class="sm:ml-8 lg:ml-0 text-3xl font-bold text-primary-text dark:text-white mb-8">Профиль</h1>
    <AppTabs :tabs="profileTabs" />
    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({ layout: 'default' });
const profileTabs = [
  { name: 'Персональные данные', path: '/profile' },
  { name: 'Настройки', path: '/profile/settings' },
];
useHead({
  title: 'Мой профиль | Humo TV Partners',
});
</script>