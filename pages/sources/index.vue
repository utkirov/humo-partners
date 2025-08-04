<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Активные</h1>
      <NuxtLink to="/sources/add" class="bg-accent-orange text-white font-bold py-2 px-4 rounded-lg shadow-md">+ Добавить</NuxtLink>
    </div>

    <div v-if="isLoading">Загрузка активных промокодов...</div>

    <div v-else-if="activePromocodes.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <PromocodeCard
          v-for="promocode in activePromocodes"
          :key="promocode.id"
          :promocode="promocode"
      />
    </div>

    <div v-else>У вас пока нет активных промокодов.</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSourceStore } from '~/store/source';
import PromocodeCard from '~/components/sources/PromocodeCard.vue';

const sourceStore = useSourceStore();
const { activePromocodes, isLoading } = storeToRefs(sourceStore);
const { fetchActivePromocodes } = sourceStore;

onMounted(() => {
  if (activePromocodes.value.length === 0) {
    fetchActivePromocodes();
  }
});

useHead({
  title: 'Активные источники | Humo TV Partners',
});
</script>