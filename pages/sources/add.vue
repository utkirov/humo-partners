<template>
  <div class="max-w-md">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
      <h2 class="text-xl font-bold text-primary-text dark:text-white mb-6">Добавить источник</h2>

      <div v-if="pendingTypes" class="text-center text-secondary-text">Загрузка типов...</div>

      <div v-else-if="typesError" class="text-center text-red-500">Не удалось загрузить типы источников.</div>

      <form v-else @submit.prevent="onSubmit" class="space-y-6">

        <FormSelect
            name="type_id"
            label="Выберите тип продвижения"
            :options="sourceTypesOptions"
        />

        <FormInput
            name="url"
            label="Введите ссылку на вашу платформу"
            placeholder="https://t.me/example"
            icon-name="ph:link"
        />

        <FormInput
            name="description"
            label="Описание промокода"
            placeholder="Промокод на скидку 15%"
            icon-name="ph:pencil-line"
        />

        <div class="pt-2">
          <button :disabled="isLoading" type="submit" class="w-full bg-accent-orange text-white font-bold py-3 px-4 rounded-xl shadow-md disabled:opacity-50">
            <span v-if="isLoading">Отправка...</span>
            <span v-else>Оставить заявку</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { object, string, number } from 'yup';
useHead({ title: 'Добавить источник | Humo TV Partners' });

const toast = useToast();
const isLoading = ref(false);

// --- 1. Загрузка типов источников для селекта ---
const { data: sourceTypes, pending: pendingTypes, error: typesError } = useAsyncData(
    'sourceTypes',
    () => useApiFetch('/dashboard/sources/types')
);

// Преобразуем загруженные типы в формат для компонента FormSelect
const sourceTypesOptions = computed(() => {
  if (!sourceTypes.value?.data) return [];
  return sourceTypes.value.data.map(type => ({
    value: type.id,
    label: type.name,
  }));
});

// --- 2. Логика отправки формы ---
const { handleSubmit } = useForm({
  validationSchema: object({
    type_id: number().required('Тип обязателен'),
    url: string().url('Введите корректную ссылку').required('Ссылка обязательна'),
    description: string(),
  })
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const queryParams = new URLSearchParams({
      type_id: values.type_id,
      url: values.url,
      description: values.description || '',
    });

    await useApiFetch(`/dashboard/sources/add?${queryParams.toString()}`, {
      method: 'POST',
    });

    toast.success({title: 'Успех!', message: 'Ваша заявка на добавление источника отправлена.'});
    await navigateTo('/sources/requests'); // Переходим на страницу заявок

  } catch (error) {
    useApiError(error, toast);
  } finally {
    isLoading.value = false;
  }
});
</script>