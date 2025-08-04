<template>
  <div class="flex min-h-screen bg-main-bg dark:bg-gray-900 text-primary-text dark:text-gray-200">
    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-black/30 z-30 lg:hidden"></div>

    <TheSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="flex-1 flex flex-col min-w-0 relative overflow-x-hidden">
      <button @click="isSidebarOpen = true" class="absolute top-6 left-4 z-20 p-2 lg:hidden">
        <Icon name="ph:list" class="h-6 w-6" />
      </button>

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false);
</script>