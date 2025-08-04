<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
    <div class="flex items-center gap-4">
      <div class="p-3 rounded-lg" :class="iconBgClass">
        <Icon :name="icon" class="h-6 w-6" :class="iconColorClass" />
      </div>
      <div>
        <p class="text-sm text-secondary-text dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-primary-text dark:text-white">{{ value.toLocaleString('fr-FR') }}</g>
          <p v-if="percentageChange" class="text-xs mt-1" :class="isIncrease ? 'text-green-500' : 'text-red-500'">
            <Icon :name="isIncrease ? 'ph:arrow-up-bold' : 'ph:arrow-down-bold'" />
            {{ percentageChange }}% vs last month
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  value: Number,
  icon: String,
  iconBgClass: String,
  iconColorClass: String,
  percentageChange: Number,
  changeType: String, // 'increase' or 'decrease'
});

const isIncrease = computed(() => props.changeType === 'increase');
</script>