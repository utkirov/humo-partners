<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Добавить новый источник</h1>
    <form @submit.prevent="handleSubmit" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm max-w-lg space-y-4">
      <div>
        <label for="source-type">Тип источника</label>
        <select v-model="form.type_id" id="source-type" required class="w-full mt-1 p-2 border rounded-md dark:bg-gray-700">
          <option disabled value="">Выберите тип</option>
          <option v-for="type in sourceTypes" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="source-url">URL</label>
        <input v-model="form.url" type="url" id="source-url" placeholder="https://example.com" required class="w-full mt-1 p-2 border rounded-md dark:bg-gray-700" />
      </div>
      <div>
        <label for="source-desc">Описание</label>
        <textarea v-model="form.description" id="source-desc" rows="4" required class="w-full mt-1 p-2 border rounded-md dark:bg-gray-700"></textarea>
      </div>
      <button type="submit" :disabled="isSubmitting" class="w-full bg-accent-orange text-white font-bold py-3 rounded-lg disabled:opacity-50">
        {{ isSubmitting ? 'Отправка...' : 'Отправить на модерацию' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSourceStore } from '~/store/source';

const router = useRouter();
const toast = useToast();
const sourceStore = useSourceStore();

const { sourceTypes } = storeToRefs(sourceStore);
const { fetchSourceTypes, addSource } = sourceStore;

const form = reactive({
  type_id: '',
  url: '',
  description: '',
});
const isSubmitting = ref(false);
useHead({
  title: 'Добавить источник | Humo TV Partners',
});
async function handleSubmit() {
  isSubmitting.value = true;
  try {
    await addSource(form);
    toast.success({ title: 'Успех', message: 'Ваша заявка отправлена на рассмотрение.' });
    router.push('/sources/requests');
  } catch (error) {
    toast.error({ title: 'Ошибка', message: 'Не удалось отправить заявку.' });
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  if (sourceTypes.value.length === 0) {
    fetchSourceTypes();
  }
});
</script>