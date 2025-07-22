<template>
  <div>
    <label v-if="label" :for="name" class="text-sm font-medium text-primary-text dark:text-gray-200 mb-2 block">
      {{ label }}
    </label>

    <div class="relative">
      <span v-if="iconName" class="absolute inset-y-0 left-0 flex items-center pl-4 text-secondary-text dark:text-gray-400">
        <Icon :name="iconName" class="h-5 w-5" />
      </span>

      <input
          :id="name"
          v-model="value"
          :name="name"
          :type="type"
          :placeholder="placeholder"
          class="w-full bg-main-bg dark:bg-gray-700 border rounded-xl py-3 pr-4 text-primary-text dark:text-gray-200 placeholder-secondary-text dark:placeholder-gray-400 focus:outline-none focus:ring-2"
          :class="[
          iconName ? 'pl-12' : 'pl-4',
          errorMessage
            ? 'border-red-400 focus:ring-red-400'
            : 'border-transparent dark:border-gray-600 focus:ring-accent-orange/50'
        ]"
      >
    </div>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-1 pl-2 h-4">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import {useField} from 'vee-validate';

const props = defineProps({
  type: {type: String, default: 'text'},
  name: {type: String, required: true},
  label: String,
  placeholder: String,
  iconName: String,
});

const {value, errorMessage} = useField(() => props.name);
</script>