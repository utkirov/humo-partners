<template>
  <div>
    <h1 class="text-3xl font-bold text-primary-text dark:text-white mb-8">Промо материалы</h1>

    <AppTabs :tabs="promoTabs" />

    <NuxtPage />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
});

// ✨ Данные для вкладок, которые мы передаем в компонент
const promoTabs = [
  { name: 'Видео материалы', path: '/promo' },
  { name: 'Фото материалы', path: '/promo/photos' },
];
</script>