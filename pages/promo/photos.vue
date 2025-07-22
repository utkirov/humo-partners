<template>
  <div>
    <div v-if="isLoading" class="text-center py-10">
      <p class="text-secondary-text dark:text-gray-400">Загрузка фото...</p>
    </div>

    <div v-else-if="materials.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <div v-for="material in materials" :key="material.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div class="relative w-full h-56 bg-gray-200 dark:bg-gray-700">
          <img :src="material.url" :alt="material.title" class="w-full h-full object-cover">
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="font-bold text-lg text-primary-text dark:text-white mb-2">{{ material.title || `Фото #${material.id}` }}</h3>
          <p class="text-sm text-secondary-text dark:text-gray-400 mb-6 flex-grow">{{ material.description || 'Описание отсутствует.' }}</p>
          <button @click="downloadMaterial(material)" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-opacity-90 transition">
            Скачать
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
      <p class="text-secondary-text dark:text-gray-400">Фото материалы отсутствуют.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useApiFetch} from "~/composables/useApiFetch.js";

const config = useRuntimeConfig();
const toast = useToast();
// ✨ 1. Получаем доступ к данным аутентификации
const { token } = useApiFetch(); // Замените на ваш composable, если он другой

const materials = ref([]);
const isLoading = ref(false);

async function fetchMaterials() {
  // Добавляем проверку на наличие токена
  if (!token.value) {
    toast.error({ title: 'Ошибка', message: 'Вы не авторизованы.' });
    return;
  }

  isLoading.value = true;
  try {
    const response = await $fetch('/dashboard/materials', {
      baseURL: config.public.apiBase,
      method: 'GET',
      params: {
        type: 'image',
        lang: 'ru',
      },
      // ✨ 2. Добавляем заголовок с Bearer токеном
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });
    materials.value = response.data || response;
  } catch (error) {
    toast.error({ title: 'Ошибка', message: 'Не удалось загрузить фото.' });
  } finally {
    isLoading.value = false;
  }
}

function downloadMaterial(material) {
  const link = document.createElement('a');
  link.href = material.url;
  link.setAttribute('download', material.title || 'promo-image');
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(() => {
  fetchMaterials();
});
</script>