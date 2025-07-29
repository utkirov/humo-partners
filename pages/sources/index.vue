<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Мои источники</h1>
      <NuxtLink to="/sources/add" class="bg-accent-orange text-white font-bold py-2 px-4 rounded-lg shadow-md">+ Добавить</NuxtLink>
    </div>

    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="activeSources.length > 0" class="space-y-4">
      <div v-for="source in activeSources" :key="source.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <p class="font-bold">{{ source.url }}</p>
        <p class="text-sm text-gray-500">{{ source.description }}</p>
      </div>
    </div>
    <div v-else>У вас пока нет активных источников.</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSourceStore } from '~/store/source';

const sourceStore = useSourceStore();
const { activeSources, isLoading } = storeToRefs(sourceStore);
const { fetchActiveSources } = sourceStore;

onMounted(() => {
  if (activeSources.value.length === 0) {
    fetchActiveSources();
  }
});
</script>