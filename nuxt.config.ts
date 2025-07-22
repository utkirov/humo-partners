// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    css: [
        // Наши глобальные стили
        '@/assets/css/main.css'
    ],
    modules: [
      '@nuxt/icon',
      '@nuxt/fonts',
      '@vee-validate/nuxt',
      'nuxt-toast',
      '@nuxtjs/color-mode',
      '@vueuse/nuxt',
    ],
    toast: {
        position: 'topRight',
        progressBar: true,
        timeout: 3000,
        close: false,
    },
    colorMode: {
        classSuffix: '' // Позволяет использовать классы .dark вместо .dark-mode
    },

    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    },

    runtimeConfig: {
        public: {
            apiBase: 'https://api.partner.humo-tv.uz/api/v1'
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    fonts: {
        provider: 'google',
        families: [
            // ✨ ЗАМЕНА: Inter заменен на Mulish
            {name: 'Mulish', weights: ['400', '700']},
        ]
    },

})