<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-bold text-primary-text dark:text-white mb-4">Активные заявки</h2>

      <div v-if="pending" class="text-center text-secondary-text dark:text-gray-400">Загрузка заявок...</div>

      <div v-else-if="error" class="text-center text-red-500">Не удалось загрузить заявки.</div>

      <div v-else-if="pendingRequests && pendingRequests.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfoCard v-for="request in pendingRequests" :key="request.id" :title="request.title" :items="request.items" />
      </div>

      <div v-else class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center text-secondary-text dark:text-gray-400">
        <p>У вас нет активных заявок.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: 'Мои заявки на источники | Humo TV Partners' });

// Загрузка данных с сервера
const { data: requestsData, pending, error } = useAsyncData(
    'pendingRequests',
    () => useApiFetch('/dashboard/sources/pending')
);

// Функция для определения стилей и текста статуса
const getStatus = (status) => {
  switch (status) {
    case 'pending':
      return { text: 'В ожидании', color: 'text-blue-500', icon: 'ph:clock' };
    case 'approved':
      return { text: 'Одобрено', color: 'text-green-500', icon: 'ph:check-circle' };
    case 'rejected':
      return { text: 'Отклонено', color: 'text-red-500', icon: 'ph:x-circle' };
    default:
      return { text: 'Неизвестно', color: 'text-gray-500', icon: 'ph:question' };
  }
};

// Преобразуем данные от API в формат для компонента InfoCard
const pendingRequests = computed(() => {
  if (!requestsData.value?.data || !Array.isArray(requestsData.value.data)) {
    return [];
  }
  return requestsData.value.data.map(request => {
    const statusInfo = getStatus(request.status);
    const date = new Date(request.created_at);
    const formattedDate = `${date.toLocaleDateString('ru-RU')} в ${date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;

    return {
      id: request.id,
      title: `Заявка №${request.id}`,
      items: [
        {
          icon: statusInfo.icon,
          label: 'Статус',
          value: statusInfo.text,
          color: statusInfo.color
        },
        {
          icon: 'ph:calendar',
          label: 'Дата',
          value: formattedDate
        },
      ]
    }
  });
});
</script>