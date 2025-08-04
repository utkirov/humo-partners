<template>
  <div>
    <h1 class="sm:ml-8 lg:ml-0 text-4xl font-bold text-primary-text dark:text-white mb-10">Часто задаваемые вопросы (FAQ)</h1>

    <div v-if="isLoading && faqs.length === 0" class="text-center py-10">
      <p>Загрузка вопросов...</p>
    </div>

    <div v-else-if="faqs.length > 0" class="space-y-4">
      <FaqItem v-for="faq in faqs" :key="faq.id" :faq="faq" />
    </div>

    <div v-else class="text-center py-10">
      <p>Не удалось загрузить вопросы или список пуст.</p>
    </div>

    <div v-if="hasMore" class="mt-8 text-center">
      <button @click="fetchFaqs" :disabled="isLoading" class="bg-gray-200 dark:bg-gray-700 py-3 px-6 rounded-xl disabled:opacity-50">
        <span v-if="isLoading">Загрузка...</span>
        <span v-else>Загрузить еще</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFaqStore } from '~/store/faq';
import FaqItem from '~/components/faq/FaqItem.vue';

useHead({ title: 'FAQ | Humo TV Partners' });

const faqStore = useFaqStore();
const { faqs, isLoading, hasMore } = storeToRefs(faqStore);
const { fetchFaqs } = faqStore;

onMounted(() => {
  if (faqs.value.length === 0) {
    fetchFaqs();
  }
});
</script>