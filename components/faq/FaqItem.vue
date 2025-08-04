<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
    <button @click="isOpen = !isOpen" class="w-full flex justify-between items-center text-left p-6">
      <span class="font-semibold text-lg text-primary-text dark:text-white">{{ faq.name }}</span>
      <Icon
          name="ph:caret-down-bold"
          class="h-6 w-6 text-gray-400 dark:text-gray-500 transition-transform flex-shrink-0"
          :class="{ 'transform rotate-180': isOpen }"
      />
    </button>
    <div v-if="isOpen" class="px-6 pb-6 text-secondary-text dark:text-gray-400">
      <p v-html="faq.text"></p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

defineProps({
  faq: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
</script>