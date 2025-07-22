<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div
          ref="modalContent"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
      >
        <div class="flex items-center justify-between p-6 border-b border-border-gray dark:border-gray-700">
          <h3 class="text-xl font-bold text-primary-text dark:text-white">{{ title }}</h3>
          <button @click="$emit('close')" class="text-secondary-text dark:text-gray-400 hover:text-primary-text dark:hover:text-white">
            <Icon name="ph:x" class="h-6 w-6" />
          </button>
        </div>

        <div class="p-6">
          <slot />
        </div>

        <div v-if="$slots.footer" class="p-6 bg-main-bg dark:bg-gray-900/50 rounded-b-2xl">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Подтверждение' }
});
const emit = defineEmits(['close']);

const modalContent = ref(null);
// Закрываем модальное окно при клике вне его
onClickOutside(modalContent, () => emit('close'));
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease-in-out;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>