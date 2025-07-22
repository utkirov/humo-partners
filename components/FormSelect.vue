<template>
  <div class="w-full">
    <label v-if="label" :for="name" class="text-sm font-medium text-primary-text dark:text-gray-200 mb-2 block">
      {{ label }}
    </label>
    <div class="relative">
      <select
          :id="name"
          v-model="value"
          :name="name"
          class="w-full appearance-none bg-main-bg dark:bg-gray-700 border rounded-lg py-2 px-4 text-primary-text dark:text-gray-200 focus:outline-none focus:ring-2"
          :class="errorMessage ? 'border-red-400 focus:ring-red-400' : 'border-border-gray dark:border-gray-600 focus:ring-accent-orange/50'"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-text">
        <Icon name="ph:caret-down" class="h-4 w-4" />
      </div>
    </div>
    <p v-if="errorMessage" class="text-red-500 text-xs mt-1 pl-2">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  options: {
    type: Array,
    required: true, // [{ value: 'all', label: 'Все' }]
  }
});

const { value, errorMessage } = useField(() => props.name);
</script>