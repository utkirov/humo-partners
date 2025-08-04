<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Заявки на рассмотрении</h1>

    <div v-if="isLoading">Загрузка заявок...</div>

    <div v-else-if="pendingSources.length > 0" class="space-y-4">
      <div v-for="request in pendingSources" :key="request.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-sm">
        <div>
          <p class="font-bold text-primary-text dark:text-white">Заявка #{{ request.id }}</p>
          <p class="text-sm text-secondary-text dark:text-gray-400 mt-1">Дата подачи: {{ request.data }}</p>
        </div>
        <span class="font-semibold px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          {{ request.status === 'pending' ? 'В обработке' : request.status }}
        </span>
      </div>
    </div>

    <div v-else>У вас нет заявок на рассмотрении.</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSourceStore } from '~/store/source';

useHead({
  title: 'Заявки на рассмотрении | Humo TV Partners',
});

const sourceStore = useSourceStore();
const { pendingSources, isLoading } = storeToRefs(sourceStore);
const { fetchPendingSources } = sourceStore;

onMounted(() => {
  if (pendingSources.value.length === 0) {
    fetchPendingSources();
  }
});
</script>