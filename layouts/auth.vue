<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-main-bg dark:bg-gray-900 p-4">
    <header class="mb-8">
      <img src="/logo-auth.svg" alt="HUMO TV Partners" class="h-10">
    </header>

    <main class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-sm">
      <slot />
    </main>

    <footer class="mt-8 text-secondary-text dark:text-gray-500 text-sm">
      Версия 1.0.1
    </footer>
  </div>
</template>

<script setup>
</script>