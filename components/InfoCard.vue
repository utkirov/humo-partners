<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm relative">
    <button @click="$emit('delete')" class="absolute top-4 right-4 text-secondary-text hover:text-red-500 transition-colors p-1">
      <Icon name="ph:trash" class="h-5 w-5" />
    </button>

    <p class="font-bold text-lg mb-4 text-primary-text dark:text-white pr-8">{{ title }}</p>
    <div class="space-y-2">
      <div v-for="(item, index) in items" :key="index" class="flex items-center gap-2 text-sm">
        <Icon :name="item.icon" :class="item.color || 'text-secondary-text dark:text-gray-400'" />
        <span class="text-secondary-text dark:text-gray-400">{{ item.label }}:</span>
        <span class="font-semibold" :class="item.color || 'text-primary-text dark:text-gray-200'">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
});
defineEmits(['delete']);
</script>