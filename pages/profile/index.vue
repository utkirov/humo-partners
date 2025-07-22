<template>
  <div class="max-w-md">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm space-y-6">
      <h2 class="text-xl font-bold text-primary-text dark:text-white">Уткиров Дильшод Икромжон угли</h2>

      <div class="space-y-4">
        <div class="flex items-center gap-3 bg-main-bg dark:bg-gray-700/50 p-4 rounded-xl">
          <Icon name="ph:user" class="h-5 w-5 text-secondary-text" />
          <span class="text-primary-text dark:text-gray-200">Уткиров Дильшод Икромжон угли</span>
        </div>
        <div class="flex items-center gap-3 bg-main-bg dark:bg-gray-700/50 p-4 rounded-xl">
          <Icon name="ph:phone" class="h-5 w-5 text-secondary-text" />
          <span class="text-primary-text dark:text-gray-200">+998 (--) --- -- --</span>
        </div>
        <div class="flex items-center gap-3 bg-main-bg dark:bg-gray-700/50 p-4 rounded-xl">
          <Icon name="ph:lock" class="h-5 w-5 text-secondary-text" />
          <span class="text-primary-text dark:text-gray-200">************</span>
        </div>
      </div>

      <div class="pt-2">
        <button class="w-full border border-border-gray dark:border-gray-600 text-primary-text dark:text-gray-200 font-bold py-3 px-4 rounded-xl hover:bg-main-bg dark:hover:bg-gray-700 transition">
          Изменить данные
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Профиль | Humo TV Partners',
});
</script>