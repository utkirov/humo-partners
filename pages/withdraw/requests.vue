<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xl font-bold text-primary-text mb-4">Активные</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="request in activeRequests" :key="request.id" class="bg-white p-6 rounded-2xl shadow-sm">
          <p class="font-bold text-lg mb-4">{{ request.title }}</p>
          <div class="flex items-center gap-2 text-sm mb-2">
            <Icon :name="getStatus(request.status).icon" :class="getStatus(request.status).color" />
            <span class="text-secondary-text">Статус:</span>
            <span class="font-semibold" :class="getStatus(request.status).color">{{ getStatus(request.status).text }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-secondary-text">
            <Icon name="ph:calendar" />
            <span>Дата: {{ request.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-primary-text mb-4">Архивные</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="request in archivedRequests" :key="request.id" class="bg-white p-6 rounded-2xl shadow-sm">
          <p class="font-bold text-lg mb-4">{{ request.title }}</p>
          <div class="flex items-center gap-2 text-sm mb-2">
            <Icon :name="getStatus(request.status).icon" :class="getStatus(request.status).color" />
            <span class="text-secondary-text">Статус:</span>
            <span class="font-semibold" :class="getStatus(request.status).color">{{ getStatus(request.status).text }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-secondary-text">
            <Icon name="ph:calendar" />
            <span>Дата: {{ request.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// В будущем эти данные будут приходить с API
const activeRequests = ref([
  { id: 1, title: 'Заявка №1', status: 'pending', date: '07.02.2023 в 15:40' },
  { id: 2, title: 'Заявка №3', status: 'pending', date: '07.02.2023 в 15:42' },
]);

const archivedRequests = ref([
  { id: 3, title: 'Заявка №2', status: 'paid', date: '06.02.2023 в 11:20' },
]);

// Функция для определения стилей и текста статуса
const getStatus = (status) => {
  switch (status) {
    case 'pending':
      return { text: 'В ожидании', color: 'text-blue-500', icon: 'ph:clock' };
    case 'paid':
      return { text: 'Оплачено', color: 'text-green-500', icon: 'ph:check-circle' };
    default:
      return { text: 'Неизвестно', color: 'text-gray-500', icon: 'ph:question' };
  }
};
</script>