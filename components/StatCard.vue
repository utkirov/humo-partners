<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm flex items-start gap-4">
    <div class="p-3 bg-main-bg dark:bg-gray-700 rounded-lg">
      <Icon :name="icon" class="h-6 w-6" :class="color" />
    </div>
    <div>
      <p class="text-sm text-secondary-text dark:text-gray-400">{{ title }}</p>
      <p class="text-2xl font-bold text-primary-text dark:text-white">{{ value }}</p>
      <div class="text-xs flex items-center mt-1" :class="percentage > 0 ? 'text-green-500' : 'text-red-500'">
        <Icon :name="percentage > 0 ? 'ph:arrow-up' : 'ph:arrow-down'" />
        <span>{{ Math.abs(percentage) }}%</span>
        <span class="text-secondary-text dark:text-gray-400 ml-1">vs last month</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  value: String,
  percentage: Number,
  color: String,
});
</script>