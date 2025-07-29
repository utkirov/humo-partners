<template>
  <div>
    <div v-if="isLoading && materials.length === 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <PromoCardSkeleton v-for="n in 3" :key="n" />
    </div>

    <div v-else-if="materials.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <div v-for="material in materials" :key="material.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div class="relative w-full h-56 bg-gray-200 dark:bg-gray-700">
          <img v-if="props.type === 'image'" :src="material.file" :alt="material.name" class="w-full h-full object-cover">
          <video v-else :src="material.file" controls class="w-full h-full object-cover bg-black"></video>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="font-bold text-lg text-primary-text dark:text-white mb-2">{{ material.name || `Материал #${material.id}` }}</h3>
          <p class="text-sm text-secondary-text dark:text-gray-400 mb-6 flex-grow">{{ material.description || 'Описание отсутствует.' }}</p>
          <button @click="downloadMaterial(material)" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-opacity-90 transition">
            Скачать
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="!isLoading && materials.length === 0" class="text-center py-10 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
      <p class="text-secondary-text dark:text-gray-400">Материалы этого типа отсутствуют.</p>
    </div>

    <div v-if="hasMore && materials.length > 0" class="mt-8 text-center">
      <button @click="fetchMaterials" :disabled="isLoading" class="bg-gray-200 dark:bg-gray-700 py-3 px-6 rounded-xl disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
        <span v-if="isLoading">Загрузка...</span>
        <span v-else>Загрузить еще</span>
      </button>
    </div>
  </div>
</template>

<script setup>
// ✨ Важно: импортируем новый компонент-скелет
import PromoCardSkeleton from './PromoCardSkeleton.vue';
import { ref, onMounted } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const toast = useToast();
const materials = ref([]);
const isLoading = ref(false);
const page = ref(1);
const hasMore = ref(true);

async function fetchMaterials() {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const response = await useApiFetch('/dashboard/materials', {
      params: {
        type: props.type,
        lang: 'ru',
        page: page.value,
      },
    });

    const newMaterials = response.data?.list || [];

    if (newMaterials.length > 0) {
      materials.value.push(...newMaterials);
      hasMore.value = response.data.currentPage < response.data.lastPage;
      page.value++;
    } else {
      hasMore.value = false;
    }
  } catch (error) {
    hasMore.value = false;
    toast.error({ title: 'Ошибка', message: `Не удалось загрузить материалы.` });
  } finally {
    isLoading.value = false;
  }
}

function downloadMaterial(material) {
  const link = document.createElement('a');
  link.href = material.file;
  link.setAttribute('download', material.name || `promo-${props.type}`);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

onMounted(fetchMaterials);
</script>