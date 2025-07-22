<template>
  <aside
      class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col p-4 fixed lg:relative inset-y-0 left-0 z-40 transition-transform duration-300 shrink-0"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <div class="px-4 mb-8 flex items-center justify-between">
      <img src="/logo.svg" alt="HUMO TV Partners" class="h-10">
      <button @click="$emit('close')" class="lg:hidden text-secondary-text dark:text-gray-400">
        <Icon name="ph:x" class="h-6 w-6" />
      </button>
    </div>

    <nav class="flex flex-col gap-2">
      <NuxtLink v-for="link in links" :key="link.path" :to="link.path" class="nav-link" @click="$emit('close')">
        <Icon :name="link.icon" class="h-5 w-5" />
        <span>{{ link.name }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-auto pt-4 border-t border-border-gray dark:border-gray-700">
      <div class="px-4 py-2 flex justify-between items-center">
        <span class="text-sm font-semibold text-secondary-text dark:text-gray-400">Тема</span>
        <ThemeSwitcher />
      </div>
      <a href="#" @click.prevent="logout" class="nav-link mt-2">
        <Icon name="ph:sign-out" class="h-5 w-5" />
        <span>Выйти</span>
      </a>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});
defineEmits(['close']);

const links = ref([
  { name: 'Главная', icon: 'ph:house', path: '/' },
  { name: 'Источники', icon: 'ph:link', path: '/sources' },
  { name: 'Промо материалы', icon: 'ph:gift', path: '/promo' },
  { name: 'Статистика', icon: 'ph:chart-line', path: '/stats' },
  { name: 'Выводы', icon: 'ph:credit-card', path: '/withdraw' },
  { name: 'FAQ', icon: 'ph:question', path: '/faq' },
  { name: 'Профиль', icon: 'ph:user-circle', path: '/profile' },
]);

const logout = () => {
  useCookie('auth_token').value = null;
  navigateTo('/login');
}
</script>

<style scoped>
/* Стили остаются без изменений */
.nav-link {
  @apply flex items-center gap-3 px-4 py-2.5 rounded-lg text-secondary-text dark:text-gray-400 font-semibold transition-colors;
}
.nav-link:hover {
  @apply bg-main-bg dark:bg-gray-700 text-primary-text dark:text-white;
}
.router-link-active {
  @apply bg-accent-orange text-white;
}
.router-link-active:hover {
  @apply bg-accent-orange text-white;
}
a[href="/"].router-link-active:not(.router-link-exact-active) {
  @apply bg-transparent text-secondary-text dark:text-gray-400;
}
a[href="/"].router-link-active:not(.router-link-exact-active):hover {
  @apply bg-main-bg dark:bg-gray-700 text-primary-text dark:text-white;
}
</style>