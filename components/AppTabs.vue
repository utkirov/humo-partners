<template>
  <div
      class="flex items-center gap-2 mb-8 overflow-x-auto hide-scrollbar"
      :class="{ 'border-b border-border-gray dark:border-gray-700': variant === 'underline' }"
  >
    <NuxtLink
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="tab-link whitespace-nowrap" :class="`variant-${variant}`"
    >
      {{ tab.name }}
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  variant: {
    type: String,
    default: 'underline' // 'underline' | 'pill'
  }
});
</script>

<style scoped>
/* Общие стили для всех вкладок */
.tab-link {
  @apply font-semibold transition-colors text-secondary-text dark:text-gray-400;
}

/* Стили для варианта "underline" */
.tab-link.variant-underline {
  @apply py-3 px-2 relative;
}
.variant-underline.router-link-exact-active {
  @apply text-accent-orange;
}
.variant-underline.router-link-exact-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-accent-orange;
}

/* Стили для варианта "pill" */
.tab-link.variant-pill {
  @apply py-2 px-5 rounded-lg;
}
.variant-pill:hover {
  @apply bg-main-bg dark:bg-gray-700;
}
.variant-pill.router-link-exact-active {
  @apply bg-accent-orange text-white;
}
.variant-pill.router-link-exact-active:hover {
  @apply bg-accent-orange text-white;
}

/* ✨ ИЗМЕНЕНИЕ: Добавлен стиль для скрытия полосы прокрутки */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>