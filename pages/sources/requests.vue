<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Заявки на рассмотрении</h1>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="pendingSources.length > 0" class="space-y-4">
      <div v-for="source in pendingSources" :key="source.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <p class="font-bold">{{ source.url }}</p>
        <p class="text-sm text-gray-500">{{ source.description }}</p>
      </div>
    </div>
    <div v-else>У вас нет заявок на рассмотрении.</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSourceStore } from '~/store/source';

const sourceStore = useSourceStore();
const { pendingSources, isLoading } = storeToRefs(sourceStore);
const { fetchPendingSources } = sourceStore;

onMounted(() => {
  if (pendingSources.value.length === 0) {
    fetchPendingSources();
  }
});
</script>