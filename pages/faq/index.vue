<template>
  <div class="max-w-3xl space-y-4">
    <details
        v-for="(item, index) in faqItems"
        :key="index"
        class="bg-white p-6 rounded-2xl shadow-sm cursor-pointer group"
        :open="index === 1"
    >
      <summary class="flex justify-between items-center font-bold text-primary-text list-none">
        {{ item.q }}
        <Icon name="ph:caret-down" class="h-5 w-5 transition-transform group-open:rotate-180" />
      </summary>
      <p class="text-secondary-text mt-4 border-t border-border-gray pt-4">
        {{ item.a }}
      </p>
    </details>
  </div>
</template>

<script setup>
// Для примера, второй вопрос будет открыт по умолчанию, как на макете
const faqItems = ref([
  {
    q: 'Как оплачивать?',
    a: 'Lorem ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.'
  },
  {
    q: 'Кто мы?',
    a: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.'
  },
  {
    q: 'Название вопроса',
    a: 'Это ответ на "Название вопроса". Здесь может быть подробное описание вашей компании или сервиса.'
  },
]);
</script>