<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-bold text-primary-text dark:text-white mb-4">Активные</h2>

      <div v-if="pending" class="text-center text-secondary-text dark:text-gray-400">Загрузка источников...</div>
      <div v-else-if="error" class="text-center text-red-500">Не удалось загрузить источники.</div>

      <div v-else-if="activeSources && activeSources.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfoCard
            v-for="source in activeSources"
            :key="source.id"
            :title="source.title"
            :items="source.items"
            @delete="openConfirmationModal(source.id)"
        />
      </div>

      <div v-else class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center text-secondary-text dark:text-gray-400">
        <p>У вас пока нет активных источников.</p>
      </div>
    </div>

    <AppModal
        :is-open="isModalOpen"
        :title="modalStep === 'confirm' ? 'Удалить источник?' : 'Подтверждение удаления'"
        @close="closeModal"
    >
      <div v-if="modalStep === 'confirm'">
        <p class="text-secondary-text dark:text-gray-400">Вы уверены, что хотите удалить этот источник? Это действие необратимо.</p>
      </div>

      <div v-if="modalStep === 'sms'">
        <p class="text-secondary-text dark:text-gray-400 mb-4">На ваш номер телефона отправлен код подтверждения. Введите его, чтобы завершить удаление.</p>

        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-secondary-text dark:text-gray-400">
            <Icon name="ph:key" class="h-5 w-5" />
          </span>
          <input
              v-model="smsCode"
              type="text"
              placeholder="Код из СМС"
              class="w-full bg-main-bg dark:bg-gray-700 border rounded-xl py-3 pr-4 pl-12 text-primary-text dark:text-gray-200 placeholder-secondary-text dark:placeholder-gray-400 focus:outline-none focus:ring-2 border-transparent dark:border-gray-600 focus:ring-accent-orange/50"
          />
        </div>
      </div>

      <template #footer>
        <div v-if="modalStep === 'confirm'" class="flex justify-end gap-4">
          <button @click="closeModal" class="py-2 px-4 rounded-lg font-semibold hover:bg-main-bg dark:hover:bg-gray-700">Отмена</button>
          <button @click="requestCode" :disabled="isDeleting" class="py-2 px-4 rounded-lg font-semibold bg-accent-orange text-white hover:bg-opacity-90">
            <span v-if="isDeleting">Отправка кода...</span>
            <span v-else>Да, удалить</span>
          </button>
        </div>
        <div v-if="modalStep === 'sms'" class="flex justify-end gap-4">
          <button @click="closeModal" class="py-2 px-4 rounded-lg font-semibold hover:bg-main-bg dark:hover:bg-gray-700">Отмена</button>
          <button @click="handleDeleteSource" :disabled="isDeleting" class="py-2 px-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50">
            <span v-if="isDeleting">Удаление...</span>
            <span v-else>Подтвердить и удалить</span>
          </button>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
useHead({ title: 'Мои источники | Humo TV Partners' });
const toast = useToast();

const { data: sourcesData, pending, error, refresh: refreshSources } = useAsyncData(
    'activeSources',
    () => useApiFetch('/dashboard/sources/actives')
);

const isModalOpen = ref(false);
const sourceToDelete = ref(null);
const isDeleting = ref(false);
const modalStep = ref('confirm');
const smsCode = ref('');

const openConfirmationModal = (id) => {
  sourceToDelete.value = id;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    sourceToDelete.value = null;
    modalStep.value = 'confirm';
    smsCode.value = '';
  }, 300);
};

const requestCode = async () => {
  isDeleting.value = true;
  try {
    await useApiFetch(`/dashboard/sources/delete?source_id=${sourceToDelete.value}`, {
      method: 'POST'
    });
    toast.info({ title: 'Успех', message: 'Код подтверждения отправлен на ваш номер.' });
    modalStep.value = 'sms';
  } catch(err) {
    useApiError(err, toast);
    closeModal();
  } finally {
    isDeleting.value = false;
  }
}

const handleDeleteSource = async () => {
  if (!smsCode.value) { // Эта проверка теперь будет работать корректно
    toast.warning({ title: 'Внимание', message: 'Пожалуйста, введите код из СМС.' });
    return;
  }
  isDeleting.value = true;
  try {
    await useApiFetch(`/dashboard/sources/delete?source_id=${sourceToDelete.value}&code=${smsCode.value}`, {
      method: 'POST'
    });
    toast.success({ title: 'Успех', message: 'Источник успешно удален.' });

    await refreshSources();
    closeModal();
  } catch (err) {
    useApiError(err, toast);
  } finally {
    isDeleting.value = false;
  }
};

const activeSources = computed(() => {
  if (!sourcesData.value?.data || !Array.isArray(sourcesData.value.data)) {
    return [];
  }
  return sourcesData.value.data.map(source => ({
    id: source.id,
    title: source.promocode,
    items: [
      { icon: 'ph:timer', label: 'Количество дней', value: `${source.days || 0} дней` },
      { icon: 'ph:users', label: 'Количество активаций', value: source.activations || 0 },
      { icon: 'ph:link', label: 'Источник', value: source.source?.name || 'Не указан'},
    ]
  }));
});
</script>