<template>
  <div class="relative">
    <span v-if="$slots.icon" class="absolute inset-y-0 left-0 flex items-center pl-4">
      <slot name="icon" />
    </span>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full bg-main-bg border border-transparent rounded-xl py-3 pr-4 text-primary-text
             placeholder-secondary-text focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
        :class="{ 'pl-12': $slots.icon, 'pl-4': !$slots.icon }"
    >
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
})
defineEmits(['update:modelValue'])
</script>