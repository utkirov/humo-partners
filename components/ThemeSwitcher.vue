<template>
  <button @click="toggleTheme" class="p-2 rounded-full hover:bg-main-bg dark:hover:bg-gray-700">
    <Icon v-if="$colorMode.value === 'dark'" name="ph:sun-fill" class="h-6 w-6 text-yellow-400" />
    <Icon v-else name="ph:moon-fill" class="h-6 w-6 text-gray-700" />
  </button>
</template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>