// middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
    // Получаем токен из cookie
    const authToken = useCookie('auth_token');

    // Список страниц, которые не требуют авторизации
    const publicPages = ['/login', '/register'];

    // Если токена нет и пользователь пытается зайти НЕ на публичную страницу
    if (!authToken.value && !publicPages.includes(to.path)) {
        // Выводим уведомление и перенаправляем на страницу входа
        const toast = useToast();
        toast.warning({ title: 'Доступ запрещен', message: 'Пожалуйста, выполните вход.' });
        return navigateTo('/login');
    }
});